import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddVideos = ({ URLS, setURLS }) => {
  const [URLInput, setURLInput] = useState("");

  function addVideo(videoName) {
    const newURLS = [...URLS];
    newURLS.push(videoName);
    setURLS(newURLS);
    setURLInput("");
    console.log(URLS);
  }
  function removeVideo(videoIndex) {
    const newURLS = [...URLS];
    newURLS.splice(videoIndex, 1);
    setURLS(newURLS);
  }

  return (
    <div>
      <h4>Video URLS</h4>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" id="TempMemberForm">
          <Form.Control
            className="ProjectTextInput"
            type="text"
            placeholder="Video URL"
            value={URLInput}
            onChange={(e) => {
              setURLInput(e.target.value);
            }}
          />
          <Button
            variant="dark"
            onClick={() => {
              addVideo(URLInput);
            }}
          >
            Add Member
          </Button>
        </Form.Group>
      </Row>
      <div className="VideoUrls">
        {URLS.map((URL, idx) => {
          return (
            <div key={idx} className="VideoUrl">
              <button
                onClick={() => {
                  removeVideo(idx);
                }}
              >
                X
              </button>
              <p>{URL}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddVideos;
