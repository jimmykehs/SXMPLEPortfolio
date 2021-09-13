import React, { useState, useRef } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const MemberCard = ({ member }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {member.name ? member.name : member}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 200, hide: 200 }}
        overlay={renderTooltip}
      >
        <img
          src={
            member.image_path
              ? member.image_path
              : "https://sxmpleimages.s3.us-east-2.amazonaws.com/UserImages/DefaultProfile.jpg"
          }
          ref={target}
          onClick={() => setShow(!show)}
        />
      </OverlayTrigger>
    </>
  );
};

export default MemberCard;
