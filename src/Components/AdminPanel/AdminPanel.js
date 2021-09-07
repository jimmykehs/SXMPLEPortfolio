import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import AddMember from "./AddMembers/AddMembers.js";
import AddProject from "./AddProject/index.js";
import EditMembers from "./EditMembers/EditMembers.js";

import "./Admin.css";
import axios from "axios";

const AdminPanel = ({ token, members, projects, setMembers }) => {
  const [resetConfirmation, setResetConfirmation] = useState(false);

  function resetDatabase() {
    axios
      .get("/api/admin/resetDatabase")
      .then(() => {
        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (!localStorage.getItem("SXMPLETOKEN")) {
    window.location.href = "/";
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
        <button
          className="adminOption resetDBButton"
          onClick={() => {
            setResetConfirmation(true);
          }}
        >
          Reset Database
        </button>
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
      {resetConfirmation && (
        <div id="ResetDBModule">
          <h1>WARNING</h1>
          <p>
            This will reset all data to initial state. All those changes you
            made? Gone. If that's really what you want I guess I can't stop you,
            but you'll probably regret it.
          </p>
          <button
            className="ConfirmDBReset"
            onClick={() => {
              resetDatabase();
            }}
          >
            Do it.
          </button>
          <button
            className="CancelDBReset"
            onClick={() => {
              setResetConfirmation(false);
            }}
          >
            Nevermind...
          </button>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
