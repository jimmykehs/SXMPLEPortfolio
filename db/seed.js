const bcrypt = require("bcrypt");
const {
  addProjectMember,
  client,
  createAdmin,
  createProject,
  createMember,
  addProjectPhotos,
} = require("./index");

async function buildTables() {
  try {
    console.log("START: Dropping tables");
    await client.query(`
    DROP TABLE IF EXISTS project_media;
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
        temporary_members VARCHAR(255),
        media_urls VARCHAR(255),
        creation_date VARCHAR(255) NOT NULL
    );

    CREATE TABLE project_members(
        id SERIAL PRIMARY KEY,
        "project_id" INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        "member_id" INTEGER REFERENCES members(id) ON DELETE CASCADE,
        UNIQUE ("project_id", "member_id")
    );

    CREATE TABLE project_media(
      "project_id" INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      media_path VARCHAR(255) NOT NULL
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
        image_path: "/Assets/UserImages/JoshByrd.jpg",
      },
      { name: "Ben Maderazo", position: "Programmer" },
      { name: "Travis Favors", position: "Programmer" },
      { name: "Em Johnson", position: "Lead Artist" },
      { name: "Michael XXX", position: "Artist" },
      {
        name: "Kyle LeMaster",
        position: "Project Producer & Designer",
        image_path: "/Assets/UserImages/Kyle.jpg",
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
        temporary_members: "",
        media_urls: "",
      },
      {
        project_name: "Figure H8",
        description:
          "A 2 player figure skating arena fighting game to see who comes out on top of the ice",
        game_engine: "Unity 3D",
        language: "C#",
        audio_software: "Ableton",
        creation_date: "April 2021 - May 2021",
        temporary_members: "",
        media_urls: "",
      },
      {
        project_name: "Worked to Death",
        description:
          "A single player platform jumping, monster fighting, puzzle solving, single round survival game to see how long you can survive the horde",
        game_engine: "Unity 2D",
        language: "C#",
        audio_software: "Abelton",
        creation_date: "May 2021 - Present",
        temporary_members: "",
        media_urls: "",
      },
    ];

    initialAdmins.forEach(async (admin) => await createAdmin(admin));
    initialMembers.forEach(
      async (member) => await createMember(member, member.image_path)
    );
    initialProjects.forEach(async (project) => await createProject(project));

    const RelativityMembers = [1, 4, 6, 7, 8, 9];
    const FigureH8Members = [1, 2, 4, 6, 7, 8, 10];
    const WorkedToDeathMembers = [1, 2, 3, 4, 6, 7, 8, 10];

    RelativityMembers.forEach(async (id) => await addProjectMember(1, id));
    FigureH8Members.forEach(async (id) => await addProjectMember(2, id));
    WorkedToDeathMembers.forEach(async (id) => await addProjectMember(3, id));

    // addProjectPhotos(1, "https://via.placeholder.com/300x300");
    // addProjectPhotos(
    //   1,
    //   "https://media1.tenor.com/images/a77a9dcd5dbfed55a8826c902d4102fe/tenor.gif?itemid=20564230"
    // );
    // addProjectPhotos(1, "https://www.youtube.com/embed/b3_lVSrPB6w");
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
