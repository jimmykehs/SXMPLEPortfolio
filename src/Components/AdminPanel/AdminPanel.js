import React, { useEffect } from "react";
import AddMember from "./AddMember";
import AddProject from "./AddProject";

const AdminPanel = ({ token, members }) => {
  {
    if (!localStorage.getItem("SXMPLETOKEN")) {
      window.location.href = "/";
    }
  }
  return (
    <section id="Admin" className="Section">
      <AddMember token={token} />
      <AddProject token={token} members={members} />
    </section>
  );
};

export default AdminPanel;
