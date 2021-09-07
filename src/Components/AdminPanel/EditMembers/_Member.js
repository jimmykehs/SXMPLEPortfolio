import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { deleteMember } from "../../../Api";

const _Member = ({ member, index, setMembers, members }) => {
  const [name, setName] = useState(member.name);
  const [position, setPosition] = useState(member.position);
  const [imagePath, setImagePath] = useState(member.image_path);
  const [PFP, setPFP] = useState({});
  const [updateStatus, setUpdateStatus] = useState({});
  const [confirmPrompt, setConfirmPrompt] = useState(false);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateMember();
    }
  }, [PFP]);

  async function handleRemoveMember(memberID, index) {
    await deleteMember(memberID);
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }

  async function updateMember() {
    const userData = new FormData();
    userData.append("name", name);
    userData.append("position", position);
    userData.append("ProfilePic", PFP);

    axios
      .patch(`/api/members/${member.id}`, userData)
      .then(({ data }) => {
        setUpdateStatus({ backgroundColor: "#66cc5e" });
        setImagePath(data[0].image_path);
      })
      .catch((e) => {
        setUpdateStatus({ backgroundColor: "red" });
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setUpdateStatus({ backgroundColor: "#dddddd" });
        }, 1000);
      });
  }
  return (
    <div key={member.id} className="editMember" style={updateStatus}>
      <div className="editPFP">
        <img src={`${imagePath}`} />
        <label htmlFor={`PFP${member.id}`}>Change PFP</label>
        <input
          id={`PFP${member.id}`}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            setPFP(e.target.files[0]);
          }}
          onBlur={() => {
            updateMember();
          }}
        />
      </div>
      <div className="NamePositionInputs">
        <input
          type="text"
          value={name}
          placeholder="Member Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          onBlur={() => updateMember()}
        ></input>
        <input
          type="text"
          value={position}
          placeholder="Member Position"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          onBlur={() => updateMember()}
        ></input>
      </div>
      <button
        className="RemoveBtn"
        onClick={() => {
          setConfirmPrompt(true);
        }}
      >
        X
      </button>
      {confirmPrompt && (
        <div className="DeleteConfirm">
          <p>Are you sure you want to delete {member.name}?</p>
          <button
            className="ConfirmBtn"
            onClick={() => {
              handleRemoveMember(member.id, index);
              setConfirmPrompt(false);
            }}
          >
            Yes
          </button>
          <button
            className="DenyBtn"
            onClick={() => {
              setConfirmPrompt(false);
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default _Member;
