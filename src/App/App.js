//React app
import React, { useEffect, useState } from "react";
import { getMembers, getProjects } from "../Api";
import {
  About,
  Collage,
  Contact,
  Navigation,
  Projects,
  Team,
} from "../Components";
import "./App.css";
const App = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    async function getData() {
      setMembers(await getMembers());
      setProjects(await getProjects());
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Collage />
      <About />
      <Team members={members} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
};
export default App;
