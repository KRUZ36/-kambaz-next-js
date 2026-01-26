import Link from "next/link";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/reactjs.jpg" width={200} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/underwater.jpg" width={200} alt="Underwater Ceramic" />
            <div>
              <h5>CS1101 Underwater Ceramic</h5>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/skydiving.jpg" width={200} alt="Skydiving in the Arts" />
            <div>
              <h5>CS1101 Skydiving in the Arts</h5>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/astrology.jpg" width={200} alt="Business Astrology" />
            <div>
              <h5>CS1101 Business Astrology</h5>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/potato.jpg" width={200} alt="Programming on a Potato" />
            <div>
              <h5>CS1101 Programming on a Potato</h5>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/speaking.jpg" width={200} alt="Private Speaking" />
            <div>
              <h5>CS1101 Private Speaking</h5>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link" href="/courses/1234/home">
            <img src="/images/horror.jpg" width={200} alt="Horror Movie Studies" />
            <div>
              <h5>CS1101 Horror Movie Studies</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}