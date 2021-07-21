import React, { useEffect } from "react";
import AddMember from "./AddMember";

const AdminPanel = ({ token }) => {
  {
    if (!localStorage.getItem("SXMPLETOKEN")) {
      window.location.href = "/";
    }
  }
  return (
    <section id="Admin" className="Section">
      <AddMember token={token} />
    </section>
  );
};

export default AdminPanel;
