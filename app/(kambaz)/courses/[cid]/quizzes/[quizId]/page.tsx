"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";

export default function QuizDetails() {
  const { cid, quizId } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findQuizById(quizId as string);
      setQuiz(data);
      if (!isFaculty) {
        const countData = await client.getAttemptCount(quizId as string);
        setAttemptCount(countData.count);
      }
    };
    fetch();
  }, [quizId]);

  const handlePublishToggle = async () => {
    const updated = quiz.published
      ? await client.unpublishQuiz(quiz._id)
      : await client.publishQuiz(quiz._id);
    setQuiz(updated);
  };

  const attemptsExhausted = () => {
    if (!quiz) return false;
    if (!quiz.multipleAttempts) return attemptCount >= 1;
    return attemptCount >= (quiz.howManyAttempts || 1);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-details" className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3 gap-2">
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/preview`)}>
            Preview
          </button>
          <button className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/edit`)}>
            Edit
          </button>
        </div>
      )}
      <h2>{quiz.title}</h2>
      <hr />
      <table className="table table-borderless w-50">
        <tbody>
          <tr><td className="text-end fw-bold">Quiz Type</td>
            <td>{quiz.quizType?.replace(/_/g, " ")}</td></tr>
          <tr><td className="text-end fw-bold">Points</td>
            <td>{quiz.points}</td></tr>
          <tr><td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td></tr>
          <tr><td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
          <tr><td className="text-end fw-bold">Time Limit</td>
            <td>{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}</td></tr>
          <tr><td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts})` : "No"}</td></tr>
          <tr><td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers}</td></tr>
          <tr><td className="text-end fw-bold">Access Code</td>
            <td>{quiz.accessCode || "None"}</td></tr>
          <tr><td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td></tr>
          <tr><td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td></tr>
          <tr><td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td></tr>
        </tbody>
      </table>
      <hr />
      <table className="table table-bordered w-50">
        <thead>
          <tr><th>Due</th><th>For</th><th>Available From</th><th>Until</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate || "N/A"}</td>
            <td>Everyone</td>
            <td>{quiz.availableDate || "N/A"}</td>
            <td>{quiz.untilDate || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      {isFaculty && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className={`btn ${quiz.published ? "btn-secondary" : "btn-success"}`}
            onClick={handlePublishToggle}>
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}

      {!isFaculty && (
        <div className="d-flex flex-column align-items-center mt-3 gap-2">
          {attemptsExhausted() ? (
            <div className="alert alert-warning mb-0">
              You have used all of your attempts for this quiz.
            </div>
          ) : (
            <button className="btn btn-danger"
              onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/preview`)}>
              {attemptCount > 0 ? "Retake Quiz" : "Take Quiz"}
            </button>
          )}
          {attemptCount > 0 && (
            <small className="text-muted">
              Attempt {attemptCount} of{" "}
              {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
            </small>
          )}
        </div>
      )}
    </div>
  );
}