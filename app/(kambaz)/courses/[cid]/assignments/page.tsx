"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const filteredAssignments = assignments.filter((a: any) => a.course === cid);

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <FaSearch className="me-2" />
          <FormControl
            type="text"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            style={{ width: "300px" }}
          />
        </div>
        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <BsPlus className="fs-4" /> Group
          </Button>
          {currentUser?.role === "FACULTY" && (
            <Link href={`/courses/${cid}/assignments/new`}>
              <Button variant="danger" id="wd-add-assignment">
                <BsPlus className="fs-4" /> Assignment
              </Button>
            </Link>
          )}
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary" id="wd-assignments-title">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS 40% of Total
            <BsPlus className="fs-4 float-end" />
            <IoEllipsisVertical className="float-end fs-4" />
          </div>

          <ListGroup className="rounded-0">
            {filteredAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3"
              >
                <BsGripVertical className="me-2 fs-3" />
                <div className="d-inline-block" style={{ width: "70%" }}>
                  {currentUser?.role === "FACULTY" ? (
                    <Link
                      className="wd-assignment-link fw-bold text-decoration-none text-dark"
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                  ) : (
                    <span className="fw-bold">{assignment.title}</span>
                  )}
                  <div className="text-muted small">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> {assignment.availableFromDate} |{" "}
                    <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                  </div>
                </div>
                {currentUser?.role === "FACULTY" && (
                  <div className="float-end d-flex align-items-center">
                    {showConfirm === assignment._id ? (
                      <div className="d-flex align-items-center gap-2">
                        <span className="small">Delete?</span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            dispatch(deleteAssignment(assignment._id));
                            setShowConfirm(null);
                          }}>
                          Yes
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setShowConfirm(null)}>
                          No
                        </Button>
                      </div>
                    ) : (
                      <FaTrash
                        className="text-danger me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowConfirm(assignment._id)}
                      />
                    )}
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}