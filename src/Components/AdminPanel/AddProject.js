import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddProject = ({ token, members }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [language, setLanguage] = useState("");
  const [engine, setEngine] = useState("");
  const [audio, setAudio] = useState("");
  const [date, setDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
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
  function handleSubmit() {
    axios
      .post("/api/projects", {
        ProjectData: {
          project_name: name,
          description: desc,
          language,
          game_engine: engine,
          audio_software: audio,
          creation_date: date,
        },
        members: selectedMembers,
      })
      .then(({ data }) => {
        console.log(data);
      });
  }
  return (
    <div className="Create-Project-Form">
      <h1>Add Project</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Control
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: "100px" }}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Control
              type="text"
              placeholder="Game Engine"
              value={engine}
              onChange={(e) => {
                setEngine(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
            <Form.Control
              type="text"
              placeholder="Language"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
          <Form.Control
            type="text"
            placeholder="Audio Software"
            value={audio}
            onChange={(e) => {
              setAudio(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
          <Form.Control
            type="text"
            placeholder="Creation Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Form.Group>
        {members.map((member) => (
          <Form.Check
            label={member.name}
            type="checkbox"
            value={member.id}
            onChange={(e) => {
              handleCheck(e);
              console.log(selectedMembers);
            }}
          />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProject;
