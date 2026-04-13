"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as accountClient from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const fetchUser = async () => {
    const data = await accountClient.findUserById(uid);
    setUser(data);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  const deleteUser = async () => {
    await accountClient.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");
    const updatedUser = { ...user, firstName, lastName };
    await accountClient.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow"
      style={{ width: "300px", zIndex: 1000 }}>
      <button onClick={onClose}
        className="btn position-absolute end-0 top-0 m-2">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary fs-1" style={{ fontSize: "80px" }} />
      </div>
      <hr />
      <div className="text-danger fs-4 mb-2">
        {!editing ? (
          <div className="wd-name" onClick={() => setEditing(true)}
            style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
            <FaPencil className="float-end fs-5 mt-2 wd-edit"
              onClick={() => setEditing(true)}
              style={{ cursor: "pointer" }} />
          </div>
        ) : (
          <div>
            <input
              className="form-control w-75 d-inline-block"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") saveUser(); }}
            />
            <FaCheck className="ms-2 fs-5 wd-save"
              onClick={saveUser}
              style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>
      <p><b>Role:</b> <span className="wd-roles">{user.role}</span></p>
      <p><b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span></p>
      <p><b>Section:</b> <span className="wd-section">{user.section}</span></p>
      <p><b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span></p>
      <hr />
      <button onClick={deleteUser}
        className="btn btn-danger float-end wd-delete">
        Delete
      </button>
      <button onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel">
        Cancel
      </button>
    </div>
  );
}