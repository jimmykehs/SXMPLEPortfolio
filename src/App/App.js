//React app
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { getMembers, getProjects } from "../Api";
import {
  About,
  AdminPanel,
  Collage,
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
      setMembers(await getMembers());
      setProjects(await getProjects());
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Navigation
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setToken={setToken}
      />
      <Route exact path="/">
        <Collage />
        <About />
        <Team members={members} />
        <Projects projects={projects} />
        <Contact />
      </Route>
      <Route exact path="/login">
        <Login setToken={setToken} setLoggedIn={setLoggedIn} />
      </Route>
      <Route exact path="/admin">
        <AdminPanel token={token} members={members} />
      </Route>
    </div>
  );
};
export default App;
