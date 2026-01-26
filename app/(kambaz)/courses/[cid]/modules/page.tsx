export default function Modules() {
  return (
    <div id="wd-modules">
      <div className="wd-modules-controls">
        <button id="wd-collapse-all">Collapse All</button>
        <button id="wd-view-progress">View Progress</button>
        <button id="wd-publish-all">Publish All</button>
        <button id="wd-add-module">+ Module</button>
      </div>

      <ul id="wd-modules-list">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <div className="wd-title">LEARNING OBJECTIVES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">READING</div>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">SLIDES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <div className="wd-title">LEARNING OBJECTIVES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy the assignment to Netlify</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">READING</div>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">SLIDES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and Paragraphs</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <div className="wd-title">LEARNING OBJECTIVES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to style with CSS</li>
                <li className="wd-content-item">Learn about Bootstrap framework</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">READING</div>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 3 - Cascading Style Sheets</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <div className="wd-title">SLIDES</div>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">Styling with Bootstrap</li>
                <li className="wd-content-item">Responsive Design</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}