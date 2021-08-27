import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import TeamMembers from "./TeamMembers";
import TempMembers from "./TempMembers";
import AddVideos from "./AddVideos";
import AddPhotos from "./AddPhotos";

const AddProject = ({ token, members }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [language, setLanguage] = useState("");
  const [engine, setEngine] = useState("");
  const [audio, setAudio] = useState("");
  const [date, setDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [success, setSuccess] = useState("");
  const [tempMembers, setTempMembers] = useState([]);
  const [URLS, setURLS] = useState([]);
  const [projectPhotos, setProjectPhotos] = useState([]);

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
          temporary_members: tempMembers.join(),
          media_urls: URLS.join(),
        },
        members: selectedMembers,
      })
      .then(({ data }) => {
        console.log(projectPhotos);
        const projectPhotoData = new FormData();
        projectPhotos.forEach((photo) => {
          projectPhotoData.append("projectMedia", photo);
        });
        axios.post(`/api/projects/photos/${data.id}`, projectPhotoData);
      })
      .then(() => {
        setSuccess("Project Added!");
      })
      .catch((err) => {
        setSuccess(err);
      });
  }

  return (
    <div className="Create-Project-Form">
      <h1>Add Project</h1>
      <p>{success}</p>
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
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ height: "100px" }}
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Control
              type="text"
              placeholder="Game Engine"
              value={engine}
              onChange={(e) => {
                setEngine(e.target.value);
              }}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
            <Form.Control
              type="text"
              placeholder="Audio Software"
              value={audio}
              onChange={(e) => {
                setAudio(e.target.value);
              }}
              required
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
            <Form.Control type="text" placeholder="Art Software" required />
          </Form.Group>
        </Row>
        <TeamMembers
          members={members}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
        <div className="CustomFields">
          <TempMembers
            tempMembers={tempMembers}
            setTempMembers={setTempMembers}
          />
          <AddVideos URLS={URLS} setURLS={setURLS} />
        </div>
        <AddPhotos
          setProjectPhotos={setProjectPhotos}
          projectPhotos={projectPhotos}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProject;
