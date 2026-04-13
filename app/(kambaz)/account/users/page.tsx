"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const data = await client.findUsersByRole(role);
      setUsers(data);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const data = await client.findUsersByPartialName(name);
      setUsers(data);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users
        <button onClick={createUser}
          className="btn btn-danger float-end ms-2">
          <FaPlus className="me-2" />Users
        </button>
      </h3>
      <input
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search by name..."
        className="form-control w-25 float-start me-2 mb-2" />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select w-25 float-start mb-2">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
        <option value="USER">Users</option>
      </select>
      <table className="table table-striped" style={{ clear: "both" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}