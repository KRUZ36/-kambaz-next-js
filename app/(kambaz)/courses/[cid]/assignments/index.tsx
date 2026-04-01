"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid);
    setAssignments(data);
  };

  const createAssignment = async () => {
    if (!title) return;
    const newAssignment = await client.createAssignment(cid, { title });
    setAssignments([...assignments, newAssignment]);
    setTitle("");
  };

  const deleteAssignment = async (id: string) => {
    await client.deleteAssignment(id);
    setAssignments(assignments.filter((a) => a._id !== id));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div>
      <h3>Assignments</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Assignment"
      />
      <button onClick={createAssignment}>Add</button>

      <ul>
        {assignments.map((a) => (
          <li key={a._id}>
            {a.title}
            <button onClick={() => deleteAssignment(a._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}