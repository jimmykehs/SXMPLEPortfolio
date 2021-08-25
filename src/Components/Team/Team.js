import React from "react";
import "./Team.css";

const Team = ({ members, token }) => {
  function removeMember(){
    console.log("Hey")
  }
  return (
    <section id="Team" className="Section">
      <h1>Our Team</h1>
      <div className="Members-Container">
        {members.map((member) => {
          const { image_path, name, position } = member;
          return (
            <div className="Member-Card-Container">
              <div className="Member-Card">
                {token && <button className="RemoveBtn" onClick={()=>{removeMember()}}>X</button>}
                <img src={image_path} alt="Team Member" />
                <div className="Member-Details">
                  <h5>{name}</h5>
                  <p>{position}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Team;
