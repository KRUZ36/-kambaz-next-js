"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <FaSearch className="me-2" />
          <FormControl type="text" placeholder="Search for Assignments"
            id="wd-search-assignment" style={{ width: "300px" }} />
        </div>
        {isFaculty && (
          <div>
            <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
              <BsPlus className="fs-4" /> Group
            </Button>
            <Button variant="danger" id="wd-add-assignment" onClick={addAssignment}>
              <BsPlus className="fs-4" /> Assignment
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary" id="wd-assignments-title">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS 40% of Total
            {isFaculty && (
              <>
                <BsPlus className="fs-4 float-end" />
                <IoEllipsisVertical className="float-end fs-4" />
              </>
            )}
          </div>
          <ListGroup className="rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroupItem key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
                <BsGripVertical className="me-2 fs-3" />
                <div className="d-inline-block" style={{ width: "80%" }}>
                  <Link className="wd-assignment-link fw-bold text-decoration-none text-dark"
                    href={`/courses/${cid}/assignments/${assignment._id}`}>
                    {assignment.title}
                  </Link>
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> {assignment.availableFromDate} |{" "}
                    <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                  </div>
                </div>
                {isFaculty && (
                  <IoEllipsisVertical className="float-end fs-4"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeAssignment(assignment._id)} />
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}