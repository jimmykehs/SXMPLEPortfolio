import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import AddMember from "./AddMember";
import AddProject from "./AddProject/index.js";

import "./Admin.css";
import SortMembers from "./SortMembers/SortMembers.js";

const AdminPanel = ({ token, members, setMembers }) => {
  {
    if (!localStorage.getItem("SXMPLETOKEN")) {
      window.location.href = "/";
    }
  }
  return (
    <Router>
      <section id="Admin" className="Section">
        <div className="adminOptionsContainer">
          <NavLink className="adminOption" to="/admin/addMember">
            Add Member
          </NavLink>
          <NavLink className="adminOption" to="/admin/addProject">
            Add Project
          </NavLink>
          <NavLink className="adminOption" to="/admin/sortMembers">
            Edit Members
          </NavLink>
        </div>
        <Switch>
          <Route path="/admin/addMember">
            <AddMember
              token={token}
              members={members}
              setMembers={setMembers}
            />
          </Route>
          <Route path="/admin/addProject">
            <AddProject token={token} members={members} />
          </Route>
          <Route path="/admin/sortMembers">
            <SortMembers members={members} setMembers={setMembers} />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default AdminPanel;
