import React from "react";
import "./Team.css";
import { deleteMember } from "../../Api";

const Team = ({ members, setMembers, token }) => {
  async function handleRemoveMember(memberID, index) {
    const member = await deleteMember(memberID);
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }
  return (
    <section id="Team" className="Section">
      <h1>Our Team</h1>
      <div className="Members-Container">
        {members.map((member, index) => {
          const { image_path, name, position } = member;
          return (
            <div className="Member-Card-Container" key={index}>
              <div className="Member-Card">
                {token && (
                  <button
                    className="RemoveBtn"
                    onClick={() => {
                      handleRemoveMember(member.id, index);
                    }}
                  >
                    X
                  </button>
                )}
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
