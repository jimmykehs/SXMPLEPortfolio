import React, { useCallback } from "react";

import _Member from "./_Member";

const EditMembers = ({ members, setMembers }) => {
  return (
    <div>
      {members.map((member, idx) => {
        return (
          <_Member
            key={member.id}
            index={idx}
            id={member.id}
            member={member}
            members={members}
            setMembers={setMembers}
          />
        );
      })}
    </div>
  );
};

export default EditMembers;
