import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import AddMember from "./AddMember";
import AddProject from "./AddProject/index.js";
import EditMembers from "./EditMembers/EditMembers.js";

import "./Admin.css";

const AdminPanel = ({ token, members, projects, setMembers }) => {
  {
    if (!localStorage.getItem("SXMPLETOKEN")) {
      window.location.href = "/";
    }
  }

  let { path, url } = useRouteMatch();
  return (
    <section id="Admin" className="Section">
      <div className="adminOptionsContainer">
        <Link className="adminOption" to={`${url}/addMember`}>
          Add Members
        </Link>
        <Link className="adminOption" to={`${url}/editMembers`}>
          Edit Members
        </Link>
        <Link className="adminOption" to={`${url}/addProject`}>
          Add Projects
        </Link>
      </div>
      <Switch>
        <Route exact path={`${path}/addMember`}>
          <AddMember token={token} members={members} setMembers={setMembers} />
        </Route>
        <Route exact path={`${path}/editMembers`}>
          <EditMembers members={members} setMembers={setMembers} />
        </Route>
        <Route exact path={`${path}/addProject`}>
          <AddProject token={token} members={members} />
        </Route>
      </Switch>
    </section>
  );
};

export default AdminPanel;
