const { Client } = require("pg");
const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/sxmple";
const client = new Client(DB_URL);

//Get Functions
async function getAllMembers() {
  const { rows } = await client.query(`SELECT * FROM MEMBERS`);
  return rows;
}

async function getAllProjects() {
  try {
    const { rows: projects } = await client.query(`
    SELECT * FROM projects;
`);
    const { rows: members } = await client.query(`
        SELECT members.*, project_members."project_id"
        FROM members
        JOIN project_members ON members.id = project_members."member_id";
    `);

    const { rows: media } = await client.query(`
      SELECT project_media.*
      FROM project_media
      JOIN projects ON project_media."project_id" = projects.id;
    `);

    projects.map((project) => {
      project.members = [];
      project.media = [];
      members.map((member) => {
        if (member.project_id === project.id) {
          project.members.push(member);
        }
      });
      media.map((media) => {
        if (media.project_id === project.id) {
          project.media.push(media.media_path);
        }
      });
    });

    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function getAdminByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
  SELECT * FROM admins
  WHERE username = ($1);
  `,
      [username]
    );

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//Create functions
async function createAdmin({ username, password }) {
  try {
    const {
      rows: [newAdmin],
    } = await client.query(
      `
          INSERT INTO admins(username, password)
          VALUES($1, $2)
          ON CONFLICT (username) DO NOTHING
          RETURNING *
        `,
      [username, password]
    );
    console.log(newAdmin);
    return newAdmin;
  } catch (error) {
    console.log("Error creating admin", error);
    throw error;
  }
}
async function createMember(
  { name, position = "Team Member" },
  image_path = "Assets/UserImages/DefaultProfile.jpg"
) {
  try {
    console.log(image_path);
    const {
      rows: [newMember],
    } = await client.query(
      `
        INSERT INTO members(name, position, image_path)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [name, position, image_path]
    );
    console.log(newMember);
    return newMember;
  } catch (error) {
    console.log("Error creating member", error);
    throw error;
  }
}
async function createProject(projectData, members = []) {
  try {
    const {
      rows: [newProject],
    } = await client.query(
      `
            INSERT INTO projects(${Object.keys(projectData).toString()})
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `,
      Object.values(projectData)
    );
    members.forEach(async (member) => {
      console.log(member);
      await addProjectMember(newProject.id, member);
    });
    const allProjects = await getAllProjects();
    return allProjects;
  } catch (error) {
    console.log("Couldn't create project", error);
    throw error;
  }
}

async function addProjectMember(projectID, memberID) {
  const {
    rows: [addedMember],
  } = await client.query(
    `
        INSERT INTO project_members("project_id","member_id")
        VALUES($1, $2)
        RETURNING *`,
    [projectID, memberID]
  );
  return addedMember;
}

async function addProjectMedia(projectID, media_path) {
  const projectMedia = await client.query(
    `
    INSERT INTO project_media("project_id", media_path)
    VALUES ($1, $2)
    RETURNING *;
  
  
  `,
    [projectID, media_path]
  );

  return projectMedia;
}

module.exports = {
  addProjectMedia,
  addProjectMember,
  client,
  createAdmin,
  createMember,
  createProject,
  getAdminByUsername,
  getAllMembers,
  getAllProjects,
};
