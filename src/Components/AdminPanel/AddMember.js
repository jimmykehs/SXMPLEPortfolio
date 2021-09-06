import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getMembers } from "../../Api";

const AddMember = ({ token, setMembers }) => {
  const [memberName, setMemberName] = useState("");
  const [memberPosition, setMemberPosition] = useState("");
  const [memberPhoto, setMemberPhoto] = useState({});
  const [success, setSuccess] = useState("");
  return (
    <div className="Create-Member-Form">
      <h1>Add Team Members</h1>
      <p>{success}</p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const userData = new FormData();
          userData.append("name", memberName);
          userData.append("position", memberPosition);
          userData.append("ProfilePic", memberPhoto);
          axios
            .post("/api/members", userData, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(async () => {
              setMemberName("");
              setMemberPosition("");
              setSuccess("User has been added!");
              const allMembers = await getMembers();
              allMembers.sort((a, b) => {
                return a.sortnumber - b.sortnumber;
              });
              setMembers(allMembers);
            });
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Member Name"
            value={memberName}
            onChange={(e) => {
              setMemberName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Position(s)"
            value={memberPosition}
            onChange={(e) => {
              setMemberPosition(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="ImageForm" className="mb-3">
          <Form.Label>
            User Image (If none selected, default photo will be used)
          </Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setMemberPhoto(e.target.files[0]);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddMember;
