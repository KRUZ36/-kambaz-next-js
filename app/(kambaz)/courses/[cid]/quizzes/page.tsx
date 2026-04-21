"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus, BsCheckCircleFill } from "react-icons/bs";
import { FaSearch, FaBan } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "dueDate" | "availableDate">("availableDate");
  const [studentScores, setStudentScores] = useState<Record<string, number>>({});
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    setQuizzes(data);

    // For students, fetch last attempt score for each quiz
    if (!isFaculty) {
      const scores: Record<string, number> = {};
      await Promise.all(
        data.map(async (quiz: any) => {
          try {
            const last = await client.getLastAttempt(quiz._id);
            if (last) scores[quiz._id] = last.score;
          } catch {
            // no attempt yet, skip
          }
        })
      );
      setStudentScores(scores);
    }
  };

  useEffect(() => { fetchQuizzes(); }, [cid]);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "Unnamed Quiz", course: cid, published: false,
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    }
    setShowMenu(null);
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = quiz.published
      ? await client.unpublishQuiz(quiz._id)
      : await client.publishQuiz(quiz._id);
    setQuizzes(quizzes.map((q) => q._id === quiz._id ? updated : q));
    setShowMenu(null);
  };

  const getAvailability = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now < available)
      return `Not available until ${available.toLocaleDateString()}`;
    return "Available";
  };

  const sortedFilteredQuizzes = quizzes
    .filter((q) => q.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name")
        return (a.title || "").localeCompare(b.title || "");
      if (sortBy === "dueDate")
        return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
      return new Date(a.availableDate || 0).getTime() - new Date(b.availableDate || 0).getTime();
    });

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <FaSearch className="me-2" />
          <FormControl
            type="text"
            placeholder="Search for Quiz"
            id="wd-search-quiz"
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isFaculty && (
          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: "160px" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="availableDate">Sort: Available Date</option>
              <option value="dueDate">Sort: Due Date</option>
              <option value="name">Sort: Name</option>
            </select>
            <Button variant="secondary" id="wd-add-quiz-group">
              <BsPlus className="fs-4" /> Group
            </Button>
            <Button variant="danger" id="wd-add-quiz" onClick={handleAddQuiz}>
              <BsPlus className="fs-4" /> Quiz
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-quiz-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary" id="wd-quizzes-title">
            <BsGripVertical className="me-2 fs-3" />
            Assignment Quizzes
            {isFaculty && (
              <>
                <BsPlus className="fs-4 float-end" />
                <IoEllipsisVertical className="float-end fs-4" />
              </>
            )}
          </div>

          <ListGroup className="rounded-0">
            {sortedFilteredQuizzes.length === 0 ? (
              <ListGroupItem className="text-center text-muted py-4">
                No quizzes yet. Click <b>+ Quiz</b> to add one.
              </ListGroupItem>
            ) : (
              sortedFilteredQuizzes.map((quiz) => (
                <ListGroupItem key={quiz._id}
                  className="wd-quiz-list-item p-3 ps-1 border-start border-success border-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <div className="d-inline-block" style={{ width: "80%" }}>
                    <span
                      className="wd-quiz-link fw-bold text-decoration-none text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}`)}>
                      {quiz.title}
                    </span>
                    <div className="text-muted small">
                      <span className="text-danger">{getAvailability(quiz)}</span> |{" "}
                      <strong>Due</strong>{" "}
                      {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "N/A"} |{" "}
                      {quiz.points} pts |{" "}
                      {quiz.questions?.length || 0} Questions
                      {!isFaculty && studentScores[quiz._id] !== undefined && (
                        <> | <strong>Score:</strong> {studentScores[quiz._id]} / {quiz.points}</>
                      )}
                    </div>
                  </div>

                  {isFaculty && (
                    <div className="float-end d-flex align-items-center gap-2">
                      <span style={{ cursor: "pointer" }}
                        onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published
                          ? <BsCheckCircleFill className="text-success fs-5" />
                          : <FaBan className="text-secondary fs-5" />}
                      </span>
                      <div className="position-relative">
                        <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }}
                          onClick={() => setShowMenu(showMenu === quiz._id ? null : quiz._id)} />
                        {showMenu === quiz._id && (
                          <div className="position-absolute end-0 bg-white border shadow"
                            style={{ zIndex: 100, minWidth: "150px" }}>
                            <div className="p-2 border-bottom" style={{ cursor: "pointer" }}
                              onClick={() => {
                                router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`);
                                setShowMenu(null);
                              }}>
                              Edit
                            </div>
                            <div className="p-2 border-bottom" style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteQuiz(quiz._id)}>
                              Delete
                            </div>
                            <div className="p-2" style={{ cursor: "pointer" }}
                              onClick={() => handleTogglePublish(quiz)}>
                              {quiz.published ? "Unpublish" : "Publish"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}