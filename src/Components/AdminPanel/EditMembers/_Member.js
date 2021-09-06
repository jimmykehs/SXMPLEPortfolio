import axios from "axios";
import React, { useState } from "react";
import { deleteMember } from "../../../Api";

const _Member = ({ member, index, setMembers, members }) => {
  const [name, setName] = useState(member.name);
  const [position, setPosition] = useState(member.position);
  const [sortNumber, setSortNumber] = useState(member.sortnumber);
  const [imagePath, setImagePath] = useState(member.image_path);
  const [PFP, setPFP] = useState({});
  const [inputStyle, setInputStyle] = useState({ border: "3px solid #eee" });
  const [confirmPrompt, setConfirmPrompt] = useState(false);

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
        setInputStyle({ border: "3px solid green" });
        setTimeout(() => {
          setInputStyle({ border: "3px solid #eee" });
        }, 1000);
        setImagePath(data[0].image_path);
      })
      .catch((e) => {
        setInputStyle({ border: "3px solid red" });
        console.log(e);
      });
  }
  return (
    <div key={member.id} className="editMember">
      <div className="editPFP">
        <img src={`../${imagePath}`} style={inputStyle} />
        <input
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
      <input
        style={inputStyle}
        type="text"
        value={name}
        placeholder="Member Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => updateMember()}
      ></input>
      <input
        style={inputStyle}
        type="text"
        value={position}
        placeholder="Member Position"
        onChange={(e) => {
          setPosition(e.target.value);
        }}
        onBlur={() => updateMember()}
      ></input>
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
          <p>Are you sure?</p>
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
