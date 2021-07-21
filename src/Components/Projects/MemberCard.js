import React, { useState, useRef } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const MemberCard = ({ member }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {member.name}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 250 }}
        overlay={renderTooltip}
      >
        <img
          src={member.image_path}
          ref={target}
          onClick={() => setShow(!show)}
        />
      </OverlayTrigger>
    </>
  );
};

export default MemberCard;
