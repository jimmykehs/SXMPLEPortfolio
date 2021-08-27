import React from "react";
import { Form, Button } from "react-bootstrap";

const AddPhotos = ({ projectPhotos, setProjectPhotos }) => {
  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Project Images</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => {
            const newPhotos = [];
            for (let i = 0; i < e.target.files.length; i++) {
              newPhotos.push(e.target.files[i]);
              setProjectPhotos(newPhotos);
            }
          }}
        />
      </Form.Group>
    </div>
  );
};

export default AddPhotos;
