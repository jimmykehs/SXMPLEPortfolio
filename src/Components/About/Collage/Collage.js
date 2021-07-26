import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Collage.css";

const Collage = () => {
  return (
    <Card className="Collage-Container bg-light text-dark" id="About">
      <Card.Img
        id="Collage-Img"
        src="https://via.placeholder.com/1000x250"
        alt="Card image"
      />
      <Card.ImgOverlay className="Collage-Overlay">
        <Card.Title>Some Interesting Text</Card.Title>
        <a href="#Projects">
          <Button>View Projects</Button>
        </a>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Collage;
