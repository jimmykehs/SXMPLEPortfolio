import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const TempMembers = ({ tempMembers, setTempMembers }) => {
  const [tempMemberName, setTempMemberName] = useState("");

  function addTempMember(memberName) {
    const newTemps = [...tempMembers];
    newTemps.push(memberName);
    setTempMembers(newTemps);
    setTempMemberName("");
  }
  function removeTempMember(memberIndex) {
    const newTemps = [...tempMembers];
    newTemps.splice(memberIndex, 1);
    setTempMembers(newTemps);
  }
  return (
    <div>
      <h4>Temporary Members</h4>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" id="TempMemberForm">
          <Form.Control
            className="ProjectTextInput"
            type="text"
            placeholder="Temporary Member"
            value={tempMemberName}
            onChange={(e) => {
              setTempMemberName(e.target.value);
            }}
          />
          <Button
            variant="dark"
            onClick={() => {
              addTempMember(tempMemberName);
            }}
          >
            Add Member
          </Button>
        </Form.Group>
      </Row>
      <div className="TempMembers">
        {tempMembers.map((temp, idx) => {
          return (
            <div key={idx} className="TempMember">
              <button
                onClick={() => {
                  removeTempMember(idx);
                }}
              >
                X
              </button>
              <p>{temp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TempMembers;
