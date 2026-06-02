"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();

  const links = [
    { href: `/courses/${cid}/home`, label: "Home", id: "wd-course-home-link" },
    { href: `/courses/${cid}/modules`, label: "Modules", id: "wd-course-modules-link" },
    { href: `/courses/${cid}/piazza`, label: "Piazza", id: "wd-course-piazza-link" },
    { href: `/courses/${cid}/zoom`, label: "Zoom", id: "wd-course-zoom-link" },
    { href: `/courses/${cid}/assignments`, label: "Assignments", id: "wd-course-assignments-link" },
    { href: `/courses/${cid}/quizzes`, label: "Quizzes", id: "wd-course-quizzes-link" },
    { href: `/courses/${cid}/people/Table`, label: "People", id: "wd-course-people-link" },
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
      style={{ width: "200px" }}
    >
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          id={link.id}
          className={`list-group-item border-0 ${
            pathname === link.href
              ? "active"
              : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}