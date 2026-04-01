"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findAssignmentsForCourse(cid as string);
      setAssignments(data);
    };
    fetch();
  }, []);

  const addAssignment = async () => {
    const a = await client.createAssignmentForCourse(cid as string, {
      title: "New Assignment", course: cid, points: 100,
      dueDate: "2025-05-15",
      availableFromDate: "2025-01-10",
      availableUntilDate: "2025-05-15",
    });
    setAssignments([...assignments, a]);
  };

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    setAssignments(assignments.filter((a) => a._id !== assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <input className="form-control me-2"
          placeholder="Search for Assignments"
          id="wd-search-assignment" />
        <button className="btn btn-primary" id="wd-add-assignment"
          onClick={addAssignment}>+ Assignment</button>
      </div>
      <h3 id="wd-assignments-title">ASSIGNMENTS 40% of Total</h3>
      <ul id="wd-assignment-list" className="list-group">
        {assignments.map((a: any) => (
          <li key={a._id}
            className="list-group-item d-flex justify-content-between align-items-center">
            <Link href={`/courses/${cid}/assignments/${a._id}`}
              className="wd-assignment-link text-decoration-none text-dark fw-bold">
              {a.title}
            </Link>
            <div>
              <span className="me-3 text-muted">
                Due: {a.dueDate} | {a.points} pts
              </span>
              <button className="btn btn-sm btn-danger"
                onClick={() => removeAssignment(a._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}