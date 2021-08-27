import React, { useEffect } from "react";
import AddMember from "./AddMember";
import AddProject from "./AddProject/index.js";

import "./Admin.css";

const AdminPanel = ({ token, members, setMembers }) => {
  {
    if (!localStorage.getItem("SXMPLETOKEN")) {
      window.location.href = "/";
    }
  }
  return (
    <section id="Admin" className="Section">
      <AddMember token={token} members={members} setMembers={setMembers} />
      <AddProject token={token} members={members} />
    </section>
  );
};

export default AdminPanel;
