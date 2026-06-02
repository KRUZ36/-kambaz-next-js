"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "../store";
import { setCourses } from "../courses/reducer";
import * as client from "../courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchCourses = async () => {
    const data = await client.findMyCourses();
    dispatch(setCourses(data));
  };

  const onAddCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => c._id === course._id ? course : c)));
  };

  const onEnroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAll]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end" id="wd-add-new-course-click"
              onClick={onAddCourse}>Add</button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click"
              onClick={onUpdateCourse}>Update</button>
          </h5>
          <br />
          <input className="form-control mb-2" value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea className="form-control mb-2" value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      {!isFaculty && (
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox"
            checked={showAll} onChange={() => setShowAll(!showAll)} />
          <label className="form-check-label">Show All Courses</label>
        </div>
      )}

      <h2 id="wd-dashboard-published">Courses ({courses.length})</h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((c: any) => (
          <div key={c._id} className="col" style={{ width: 300 }}>
            <div className="card rounded-3 overflow-hidden">
              <Link href={`/courses/${c._id}/home`} className="text-decoration-none text-dark">
                <img src="/images/reactjs.jpg" width="100%" height={160}
                  alt={c.name} style={{ objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p style={{ maxHeight: 50 }}>{c.description}</p>
                </div>
              </Link>
              <div className="card-footer">
                <Link href={`/courses/${c._id}/home`} className="btn btn-primary me-2">
                  Go
                </Link>
                {isFaculty && (
                  <>
                    <button className="btn btn-warning me-2" id="wd-edit-course-click"
                      onClick={(e) => { e.preventDefault(); setCourse(c); }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" id="wd-delete-course-click"
                      onClick={(e) => { e.preventDefault(); onDeleteCourse(c._id); }}>
                      Delete
                    </button>
                  </>
                )}
                {!isFaculty && (
                  c.enrolled ? (
                    <button className="btn btn-secondary me-2"
                      onClick={(e) => { e.preventDefault(); onUnenroll(c._id); }}>
                      Unenroll
                    </button>
                  ) : (
                    <button className="btn btn-success me-2"
                      onClick={(e) => { e.preventDefault(); onEnroll(c._id); }}>
                      Enroll
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}