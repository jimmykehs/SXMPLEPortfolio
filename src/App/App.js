//React app
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { getMembers, getProjects } from "../Api";
import {
  About,
  AdminPanel,
  Contact,
  Login,
  Navigation,
  Projects,
  Team,
} from "../Components";
import "./App.css";
const App = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getData() {
      const userToken = localStorage.getItem("SXMPLETOKEN");
      if (userToken) {
        setToken(userToken);
        setLoggedIn(true);
      }
      const allMembers = await getMembers();
      allMembers.sort((a, b) => {
        return a.sortnumber - b.sortnumber;
      });
      setMembers(allMembers);
      setProjects(await getProjects());
      var docWidth = document.documentElement.offsetWidth;

      [].forEach.call(document.querySelectorAll("*"), function (el) {
        if (el.offsetWidth > docWidth) {
          console.log(el);
        }
      });
    }
    getData();
  }, []);

  useEffect(() => {
    async function refreshProjects() {
      setProjects(await getProjects());
    }
    refreshProjects();
  }, [members]);

  return (
    <div className="App">
      <Navigation
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setToken={setToken}
      />
      <Route exact path="/">
        <About />
        <Team members={members} setMembers={setMembers} token={token} />
        <Projects token={token} projects={projects} setProjects={setProjects} />
        <Contact />
      </Route>
      <Route path="/login">
        <Login setToken={setToken} setLoggedIn={setLoggedIn} />
      </Route>
      <Route path="/admin">
        <AdminPanel
          token={token}
          members={members}
          projects={projects}
          setMembers={setMembers}
        />
      </Route>
    </div>
  );
};
export default App;
