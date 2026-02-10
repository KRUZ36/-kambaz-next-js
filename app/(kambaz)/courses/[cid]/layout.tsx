import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./navigation";
import { ReactNode } from "react";

export default async function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;   // ✅ THIS is the key change

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        <div
          className="d-none d-md-block"
          style={{ width: "200px", flexShrink: 0 }}
        >
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
