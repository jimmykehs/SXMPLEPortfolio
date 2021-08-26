import axios from "axios";

export async function getMembers() {
  const { data } = await axios.get("/api/members");
  return data;
}

export async function getProjects() {
  const { data } = await axios.get("/api/projects");
  return data;
}

export async function deleteMember(memberID) {
  const { data } = await axios.delete(`/api/members/${memberID}`);
  return data;
}
