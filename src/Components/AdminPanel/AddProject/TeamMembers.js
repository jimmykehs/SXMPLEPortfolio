import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

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
    <div>
      <h4>Team Members</h4>
      <div className="MembersList">
        {members.map((member) => {
          return (
            <Form.Check
              className="MemberCheckbox"
              key={member.id}
              label={member.name}
              type="checkbox"
              value={member.id}
              onChange={(e) => {
                handleCheck(e);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamMembers;
