"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<any>({
    title: "", description: "", points: 100,
    dueDate: "", availableFromDate: "", availableUntilDate: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const all = await client.findAssignmentsForCourse(cid as string);
      const found = all.find((a: any) => a._id === aid);
      if (found) setAssignment(found);
    };
    if (aid !== "new") fetch();
  }, [aid]);

  const save = async () => {
    if (aid === "new") {
      await client.createAssignmentForCourse(cid as string, assignment);
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" className="form-control mb-2"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />

      <textarea id="wd-description" className="form-control mb-2" rows={5}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />

      <table className="table"><tbody>
        <tr>
          <td align="right"><label htmlFor="wd-points">Points</label></td>
          <td><input id="wd-points" className="form-control" type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} /></td>
        </tr>
        <tr>
          <td align="right"><label htmlFor="wd-due-date">Due</label></td>
          <td><input id="wd-due-date" className="form-control" type="date"
            value={assignment.dueDate}
            onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} /></td>
        </tr>
        <tr>
          <td align="right"><label htmlFor="wd-available-from">Available from</label></td>
          <td><input id="wd-available-from" className="form-control" type="date"
            value={assignment.availableFromDate}
            onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })} /></td>
        </tr>
        <tr>
          <td align="right"><label htmlFor="wd-available-until">Until</label></td>
          <td><input id="wd-available-until" className="form-control" type="date"
            value={assignment.availableUntilDate}
            onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })} /></td>
        </tr>
      </tbody></table>
      <hr />
      <button className="btn btn-secondary me-2"
        onClick={() => router.push(`/courses/${cid}/assignments`)}>Cancel</button>
      <button className="btn btn-danger" onClick={save}>Save</button>
    </div>
  );
}