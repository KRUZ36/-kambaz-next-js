import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";

export default function Assignments() {
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
          <Button variant="danger" id="wd-add-assignment">
            <BsPlus className="fs-4" /> Assignment
          </Button>
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
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "80%" }}>
                <Link
                  className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  href="/courses/1234/assignments/123"
                >
                  A1 - ENV + HTML
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am | 
                  <strong> Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <IoEllipsisVertical className="float-end fs-4" />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "80%" }}>
                <Link
                  className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  href="/courses/1234/assignments/124"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am | 
                  <strong> Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <IoEllipsisVertical className="float-end fs-4" />
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 border-start border-success border-3">
              <BsGripVertical className="me-2 fs-3" />
              <div className="d-inline-block" style={{ width: "80%" }}>
                <Link
                  className="wd-assignment-link fw-bold text-decoration-none text-dark"
                  href="/courses/1234/assignments/125"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am | 
                  <strong> Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <IoEllipsisVertical className="float-end fs-4" />
            </ListGroupItem>
          </ListGroup>

        </ListGroupItem>
      </ListGroup>
    </div>
  );
}