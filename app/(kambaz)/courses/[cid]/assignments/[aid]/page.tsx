"use client";
import { useState } from "react";
import { FormControl, FormLabel, FormSelect, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      dueDate: "",
      availableFromDate: "",
      availableUntilDate: "",
      course: cid,
    }
  );

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment({ ...assignment, course: cid }));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <div className="mb-3">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </div>
        <div className="col-md-9">
          <FormControl
            id="wd-points"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </div>
        <div className="col-md-9">
          <FormSelect id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </div>
        <div className="col-md-9">
          <FormSelect id="wd-display-grade-as">
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="COMPLETE_INCOMPLETE">Complete/Incomplete</option>
          </FormSelect>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </div>
        <div className="col-md-9">
          <div className="border p-3">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option value="ONLINE">Online</option>
              <option value="PAPER">On Paper</option>
              <option value="EXTERNAL">External Tool</option>
            </FormSelect>
            <div className="fw-bold mb-2">Online Entry Options</div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-text-entry" />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-website-url" defaultChecked />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="wd-file-upload" />
              <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <FormLabel htmlFor="wd-assign-to">Assign</FormLabel>
        </div>
        <div className="col-md-9">
          <div className="border p-3">
            <div className="mb-3">
              <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
              <FormControl id="wd-assign-to" defaultValue="Everyone" />
            </div>
            <div className="mb-3">
              <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
              <FormControl
                id="wd-due-date"
                type="date"
                value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableFromDate}
                    onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    value={assignment.availableUntilDate}
                    onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary" className="me-2">Cancel</Button>
        </Link>
        <Button variant="danger" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}