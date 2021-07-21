const bcrypt = require("bcrypt");
const {
  addProjectMember,
  client,
  createAdmin,
  createProject,
  createMember,
} = require("./index");

async function buildTables() {
  try {
    console.log("START: Dropping tables");
    await client.query(`
    DROP TABLE IF EXISTS project_members;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS members;
    DROP TABLE IF EXISTS admins;
    `);
    console.log("DONE: Dropping tables");
    console.log("START: Create tables");

    await client.query(`
   CREATE TABLE admins(
       id SERIAL PRIMARY KEY,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
   );
    CREATE TABLE  members(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        image_path VARCHAR(255) NOT NULL
    );

    CREATE TABLE projects(
        id SERIAL PRIMARY KEY,
        project_name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        game_engine VARCHAR(255) NOT NULL,
        language VARCHAR(255) NOT NULL,
        audio_software VARCHAR(255) NOT NULL,
        creation_date VARCHAR(255) NOT NULL
    );

    CREATE TABLE project_members(
        id SERIAL PRIMARY KEY,
        "project_id" INTEGER REFERENCES projects(id),
        "member_id" INTEGER REFERENCES members(id),
        UNIQUE ("project_id", "member_id")
    );
   `);
    console.log("DONE: Create tables");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function seedData() {
  try {
    const initialAdmins = [
      { username: "Admin", password: await bcrypt.hash("password", 10) },
    ];
    const initialMembers = [
      {
        name: "Joshua Byrd",
        position: "Lead Programmer & Project Manager",
        image_path: "/",
      },
      { name: "Ben Maderazo", position: "Programmer" },
      { name: "Travis Favors", position: "Programmer" },
      { name: "Em Johnson", position: "Lead Artist" },
      { name: "Michael XXX", position: "Artist" },
      {
        name: "Kyle LeMaster",
        position: "Project Producer & Designer",
      },
      { name: "Allen Opperman", position: "Designer & Audio" },
      {
        name: "Heath Arnold",
        position: "Social Media Marketing",
      },
      {
        name: "Malik Dabon",
      },
      {
        name: "Patrick Sibley",
      },
    ];
    const initialProjects = [
      {
        project_name: "Relativity",
        description:
          "A single player side scrolling adventure through time and space, collecting resources and exploring a galaxy",
        game_engine: "Unity 2D",
        language: "C#",
        audio_software: "Ableton",
        creation_date: "Fall 2020 - March 2021",
      },
      {
        project_name: "Figure H8",
        description:
          "A 2 player figure skating arena fighting game to see who comes out on top of the ice",
        game_engine: "Unity 3D",
        language: "C#",
        audio_software: "Ableton",
        creation_date: "April 2021 - May 2021",
      },
      {
        project_name: "Worked to Death",
        description:
          "A single player platform jumping, monster fighting, puzzle solving, single round survival game to see how long you can survive the horde",
        game_engine: "Unity 2D",
        language: "C#",
        audio_software: "Abelton",
        creation_date: "May 2021 - Present",
      },
    ];

    initialAdmins.forEach(async (admin) => await createAdmin(admin));
    initialMembers.forEach(async (member) => await createMember(member));
    initialProjects.forEach(async (project) => await createProject(project));

    const RelativityMembers = [1, 4, 6, 7, 8, 9];
    const FigureH8Members = [1, 2, 4, 6, 7, 8, 10];
    const WorkedToDeathMembers = [1, 2, 3, 4, 6, 7, 8, 10];

    RelativityMembers.forEach((id) => addProjectMember(1, id));
    FigureH8Members.forEach((id) => addProjectMember(2, id));
    WorkedToDeathMembers.forEach((id) => addProjectMember(3, id));
  } catch (error) {
    console.log(error);
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await seedData();
  } catch (error) {
    throw error;
  }
}

rebuildDB();
