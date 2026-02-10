"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  
  const links = [
    { href: "/courses/1234/home", label: "Home", id: "wd-course-home-link" },
    { href: "/courses/1234/modules", label: "Modules", id: "wd-course-modules-link" },
    { href: "/courses/1234/piazza", label: "Piazza", id: "wd-course-piazza-link" },
    { href: "/courses/1234/zoom", label: "Zoom", id: "wd-course-zoom-link" },
    { href: "/courses/1234/assignments", label: "Assignments", id: "wd-course-assignments-link" },
    { href: "/courses/1234/quizzes", label: "Quizzes", id: "wd-course-quizzes-link" },
    { href: "/courses/1234/people/Table", label: "People", id: "wd-course-people-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0" style={{ width: "200px" }}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          id={link.id}
          className={`list-group-item border-0 ${
            pathname.includes(link.href) 
              ? "active text-black bg-white" 
              : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}