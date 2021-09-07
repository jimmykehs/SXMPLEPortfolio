import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getMembers } from "../../../Api";
import "./AddMembers.css";
const AddMember = ({ token, setMembers }) => {
  const [memberName, setMemberName] = useState("");
  const [memberPosition, setMemberPosition] = useState("");
  const [memberPhoto, setMemberPhoto] = useState({});
  const [requestStatus, setRequestStatus] = useState({
    backgroundColor: "blue",
  });
  return (
    <div className="Create-Member-Form">
      <h1>Add Team Members</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userData = new FormData();
          userData.append("name", memberName);
          userData.append("position", memberPosition);
          userData.append("ProfilePic", memberPhoto);
          axios
            .post("/api/members", userData, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(async () => {
              setMemberName("");
              setMemberPosition("");
              const allMembers = await getMembers();
              allMembers.sort((a, b) => {
                return a.sortnumber - b.sortnumber;
              });
              setMembers(allMembers);
              setRequestStatus({ backgroundColor: "rgb(53, 170, 59)" });
            })
            .catch((err) => {
              setRequestStatus({ backgroundColor: "red" });
              console.error(err);
            })
            .finally(() => {
              setTimeout(() => {
                setRequestStatus({ backgroundColor: "blue" });
              }, 1000);
            });
        }}
      >
        <input
          required
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => {
            setMemberName(e.target.value);
          }}
        />
        <input
          required
          type="text"
          placeholder="Position(s)"
          value={memberPosition}
          onChange={(e) => {
            setMemberPosition(e.target.value);
          }}
        />
        <label htmlFor="PFPUpload">
          User Image (If none selected, default photo will be used)
        </label>
        <input
          id="PFPUpload"
          type="file"
          onChange={(e) => {
            setMemberPhoto(e.target.files[0]);
          }}
        />
        <button style={requestStatus}>Submit</button>
      </form>
    </div>
  );
};

export default AddMember;
