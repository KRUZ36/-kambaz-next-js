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

  const fetchCourses = async () => {
    let data = await client.findMyCourses();

    if (showAll) {
      data = data.map((c: any) => ({ ...c, enrolled: true }));
    }

    dispatch(setCourses(data));
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAll]);

  const onEnroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    fetchCourses();
  };

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  return (
    <div id="wd-dashboard">
      <h1>Dashboard</h1>
      <hr />

      {!isFaculty && (
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
          <label className="form-check-label">
            Show All Courses
          </label>
        </div>
      )}

      <h2>Courses ({courses.length})</h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((c: any) => (
          <div key={c._id} className="col" style={{ width: 300 }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                href={`/courses/${c._id}/home`}
                className="text-decoration-none text-dark"
              >
                <img
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                  alt={c.name}
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p style={{ maxHeight: 50 }}>{c.description}</p>
                </div>
              </Link>

              <div className="card-footer">
                <Link
                  href={`/courses/${c._id}/home`}
                  className="btn btn-primary me-2"
                >
                  Go
                </Link>

                {!isFaculty && (
                  <>
                    {c.enrolled ? (
                      <button
                        className="btn btn-secondary me-2"
                        onClick={(e) => {
                          e.preventDefault();
                          onUnenroll(c._id);
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success me-2"
                        onClick={(e) => {
                          e.preventDefault();
                          onEnroll(c._id);
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}