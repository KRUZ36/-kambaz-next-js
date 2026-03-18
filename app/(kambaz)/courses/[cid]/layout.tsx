"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./navigation";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        />
        {course?.name ?? `Course ${cid}`}
      </h2>
      <Breadcrumb course={course} />
      <hr />
      <div className="d-flex">
        <div
          className="d-none d-md-block"
          style={{ width: "200px", flexShrink: 0, display: showNav ? "block" : "none !important" }}
        >
          {showNav && <CourseNavigation />}
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}