import React from "react";

const TeamMembers = ({ members, selectedMembers, setSelectedMembers }) => {
  function handleCheck(event) {
    const newSelectedMembers = [...selectedMembers];
    if (event.target.checked) {
      newSelectedMembers.push(event.target.value);
      setSelectedMembers(newSelectedMembers);
    } else {
      const index = newSelectedMembers.indexOf(event.target.value);
      newSelectedMembers.splice(index, 1);
      setSelectedMembers(newSelectedMembers);
    }
  }
  return (
    <div className="MembersListContainer">
      <h4>Team Members</h4>
      <div className="MembersList">
        {members.map((member) => {
          return (
            <div className="MemberInput">
              <input
                id={`Member${member.id}`}
                type="checkbox"
                className="MemberCheckbox"
                key={member.id}
                value={member.id}
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <label htmlFor={`Member${member.id}`}>{member.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMembers;
