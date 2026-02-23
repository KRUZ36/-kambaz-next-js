import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Mr.</span>{" "}
              <span className="wd-last-name">Clean</span>
            </td>
            <td className="wd-login-id">12345</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">Professor</td>
            <td className="wd-last-activity">2030-01-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Pikachu</span>{" "}
              <span className="wd-last-name"></span>
            </td>
            <td className="wd-login-id">23451</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2030-01-01</td>
            <td className="wd-total-activity">11:15:20</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Charizard</span>{" "}
              <span className="wd-last-name"></span>
            </td>
            <td className="wd-login-id">34512</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">1991-01-31</td>
            <td className="wd-total-activity">09:45:15</td>
          </tr>

          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Mewtwo</span>{" "}
              <span className="wd-last-name"></span>
            </td>
            <td className="wd-login-id">45123</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">9999   -10-04</td>
            <td className="wd-total-activity">12:30:45</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}