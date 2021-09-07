import React, { useState } from "react";

const TempMembers = ({ tempMembers, setTempMembers }) => {
  const [tempMemberName, setTempMemberName] = useState("");

  function addTempMember(memberName) {
    if (memberName) {
      const newTemps = [...tempMembers];
      newTemps.push(memberName);
      setTempMembers(newTemps);
      setTempMemberName("");
    }
  }
  function removeTempMember(memberIndex) {
    const newTemps = [...tempMembers];
    newTemps.splice(memberIndex, 1);
    setTempMembers(newTemps);
  }
  return (
    <div>
      <h4>Other Members</h4>
      <input
        type="text"
        placeholder="Other Member"
        value={tempMemberName}
        onChange={(e) => {
          setTempMemberName(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          addTempMember(tempMemberName);
        }}
      >
        Add Member
      </button>

      <div className="TempMembers">
        {tempMembers.map((temp, idx) => {
          return (
            <div key={idx} className="TempMember">
              <button
                onClick={() => {
                  removeTempMember(idx);
                }}
              >
                X
              </button>
              <p>{temp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TempMembers;
