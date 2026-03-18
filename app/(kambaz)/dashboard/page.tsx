"use client"
import { useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, CardText, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  const enrolledCourses = courses.filter((c: any) => isEnrolled(c._id));
  const displayedCourses = currentUser?.role === "FACULTY"
    ? courses
    : showAllCourses
    ? courses
    : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        {currentUser?.role !== "FACULTY" && (
          <Button
            variant="primary"
            className="float-end"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn">
            Enrollments
          </Button>
        )}
      </h1>
      <hr />
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <Button variant="primary" className="float-end"
                    id="wd-add-new-course-click"
                    onClick={() => dispatch(addNewCourse(course))}>
              Add
            </Button>
            <Button variant="warning" className="float-end me-2"
                    id="wd-update-course-click"
                    onClick={() => dispatch(updateCourse(course))}>
              Update
            </Button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card className="h-100">
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden"
                            style={{ height: "100px" }}>
                    {c.description}
                  </CardText>
                </CardBody>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  {isEnrolled(c._id) && (
                    <Link href={`/courses/${c._id}/home`}>
                      <Button variant="primary" id="wd-go-course-click">
                        Go
                      </Button>
                    </Link>
                  )}
                  {currentUser?.role === "FACULTY" && (
                    <div>
                      <Button
                        variant="warning"
                        className="me-2"
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c);
                        }}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        id="wd-delete-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteCourse(c._id));
                        }}>
                        Delete
                      </Button>
                    </div>
                  )}
                  {currentUser?.role !== "FACULTY" && showAllCourses && (
                    isEnrolled(c._id) ? (
                      <Button
                        variant="danger"
                        id="wd-unenroll-btn"
                        onClick={() => dispatch(unenroll({
                          userId: currentUser._id,
                          courseId: c._id
                        }))}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        id="wd-enroll-btn"
                        onClick={() => dispatch(enroll({
                          user: currentUser._id,
                          course: c._id
                        }))}>
                        Enroll
                      </Button>
                    )
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}