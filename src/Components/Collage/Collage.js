import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Collage.css";

const Collage = () => {
  return (
    <Card className="Collage-Container bg-light text-dark">
      <Card.Img
        id="Collage-Img"
        src="https://via.placeholder.com/1000x250"
        alt="Card image"
      />
      <Card.ImgOverlay>
        <Card.Title>Some Interesting Text</Card.Title>
        <a href="#Contact">
          <Button>Contact Us</Button>
        </a>
      </Card.ImgOverlay>
    </Card>
  );
};

export default Collage;
