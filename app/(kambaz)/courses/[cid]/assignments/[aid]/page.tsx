import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="wd-assignments-controls">
        <input
          id="wd-search-assignment"
          placeholder="Search for Assignments"
        />
        <br />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
      </div>

      <div className="wd-assignments-title">
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total
        </h3>
        <button>+</button>
      </div>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            className="wd-assignment-link"
            href="/courses/1234/assignments/123"
          >
            A1 - ENV + HTML
          </Link>
          <div>
            Multiple Modules | Not available until May 6 at 12:00am
          </div>
          <div>
            Due May 13 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            className="wd-assignment-link"
            href="/courses/1234/assignments/124"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            Multiple Modules | Not available until May 13 at 12:00am
          </div>
          <div>
            Due May 20 at 11:59pm | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            className="wd-assignment-link"
            href="/courses/1234/assignments/125"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div>
            Multiple Modules | Not available until May 20 at 12:00am
          </div>
          <div>
            Due May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}