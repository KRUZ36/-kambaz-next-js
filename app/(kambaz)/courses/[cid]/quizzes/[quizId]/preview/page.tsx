"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPreview() {
  const { cid, quizId } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<any>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [lockedQuestions, setLockedQuestions] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const buildShuffledQuestions = (data: any) => {
    const questions = data.questions || [];
    const processed = questions.map((q: any) => ({
      ...q,
      choices: q.type === "MULTIPLE_CHOICE" && data.shuffleAnswers
        ? shuffleArray(q.choices)
        : q.choices,
    }));
    return data.shuffleAnswers ? shuffleArray(processed) : processed;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.findQuizById(quizId as string);
      setQuiz(data);
      setShuffledQuestions(buildShuffledQuestions(data));

      if (!isFaculty) {
        const last = await client.getLastAttempt(quizId as string);
        const countData = await client.getAttemptCount(quizId as string);
        setAttemptCount(countData.count);
        if (last) {
          setAnswers(last.answers || {});
          setScore(last.score || 0);
          setSubmitted(true);
          // Auto-grant access if they already completed the quiz before
          setAccessGranted(true);
          if (data.lockQuestionsAfterAnswering) {
            setLockedQuestions(new Set(Object.keys(last.answers || {})));
          }
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [quizId]);

  // Start timer once quiz loads and access is granted
  useEffect(() => {
    if (quiz && quiz.timeLimit > 0 && !submitted &&
      (accessGranted || isFaculty || !quiz.accessCode)) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz, accessGranted, submitted]);

  const calculateScore = useCallback(() => {
    if (!quiz) return 0;
    let total = 0;
    quiz.questions.forEach((q: any) => {
      const answer = answers[q._id];
      if (q.type === "MULTIPLE_CHOICE") {
        const correct = q.choices.find((c: any) => c.correct);
        if (correct && answer === correct._id) total += q.points;
      } else if (q.type === "TRUE_FALSE") {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === "FILL_IN_BLANK") {
        if (q.blanks.some((b: string) =>
          b.toLowerCase() === answer?.toLowerCase())) total += q.points;
      }
    });
    return total;
  }, [quiz, answers]);

  const handleSubmit = useCallback(async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
    setTimeLeft(null);
    if (!isFaculty) {
      await client.saveAttempt(quizId as string, { answers, score: finalScore });
      const countData = await client.getAttemptCount(quizId as string);
      setAttemptCount(countData.count);
    }
  }, [calculateScore, answers, isFaculty, quizId]);

  // Countdown
  useEffect(() => {
    if (timeLeft === null || submitted) return;
    if (timeLeft === 0) { handleSubmit(); return; }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, submitted, handleSubmit]);

  const handleAnswer = (questionId: string, answer: any) => {
    if (lockedQuestions.has(questionId)) return;
    setAnswers((prev: any) => ({ ...prev, [questionId]: answer }));
  };

  const handleAnswerAndLock = (questionId: string, answer: any) => {
    if (lockedQuestions.has(questionId)) return;
    setAnswers((prev: any) => ({ ...prev, [questionId]: answer }));
    if (quiz.lockQuestionsAfterAnswering) {
      setLockedQuestions((prev) => new Set([...prev, questionId]));
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setLockedQuestions(new Set());
    setSubmitted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShuffledQuestions(buildShuffledQuestions(quiz));
    if (quiz.timeLimit > 0) setTimeLeft(quiz.timeLimit * 60);
  };

  const isCorrect = (q: any) => {
    const answer = answers[q._id];
    if (q.type === "MULTIPLE_CHOICE") {
      const correct = q.choices.find((c: any) => c.correct);
      return correct && answer === correct._id;
    } else if (q.type === "TRUE_FALSE") {
      return answer === q.correctAnswer;
    } else if (q.type === "FILL_IN_BLANK") {
      return q.blanks.some((b: string) =>
        b.toLowerCase() === answer?.toLowerCase());
    }
    return false;
  };

  const canRetake = () => {
    if (isFaculty) return false;
    if (!quiz.multipleAttempts) return false;
    return attemptCount < (quiz.howManyAttempts || 1);
  };

  const shouldShowCorrectAnswers = () => {
    if (isFaculty) return true;
    if (!quiz.showCorrectAnswers || quiz.showCorrectAnswers === "never") return false;
    if (quiz.showCorrectAnswers === "immediately") return true;
    if (quiz.showCorrectAnswers === "after_due_date") {
      if (!quiz.dueDate) return false;
      return new Date() > new Date(quiz.dueDate);
    }
    return false;
  };

  if (loading) return <div>Loading...</div>;
  if (!quiz) return <div>Quiz not found.</div>;
  if (shuffledQuestions.length === 0) return (
    <div className="p-3">
      <h3>{quiz.title}</h3>
      <p>No questions yet.</p>
      {isFaculty && (
        <button className="btn btn-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/edit`)}>
          Keep Editing This Quiz
        </button>
      )}
    </div>
  );

  // Access code gate — skip if already submitted (has a past attempt)
  if (quiz.accessCode && !accessGranted && !isFaculty && !submitted) {
    return (
      <div className="p-3">
        <h3>{quiz.title}</h3>
        <div className="mt-4" style={{ maxWidth: "400px" }}>
          <label className="form-label fw-bold">
            This quiz requires an access code
          </label>
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Enter access code"
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (accessCodeInput === quiz.accessCode) setAccessGranted(true);
                else alert("Incorrect access code. Please try again.");
              }
            }}
          />
          <button className="btn btn-danger" onClick={() => {
            if (accessCodeInput === quiz.accessCode) setAccessGranted(true);
            else alert("Incorrect access code. Please try again.");
          }}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // oneQuestionAtATime = false → show all questions at once
  const showAll = !quiz.oneQuestionAtATime;
  const q = shuffledQuestions[currentQuestion];
  const isLocked = (qId: string) => lockedQuestions.has(qId);
  const showCorrect = shouldShowCorrectAnswers();

  const renderQuestion = (question: any, index: number) => {
    const locked = isLocked(question._id);
    return (
      <div key={question._id}
        className={`border p-3 mb-3 rounded ${locked ? "bg-light" : ""}`}>
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold">Question {index + 1}</span>
          <div className="d-flex align-items-center gap-2">
            {locked && <span className="badge bg-secondary">Locked</span>}
            <span>{question.points} pts</span>
          </div>
        </div>
        <p>{question.question}</p>

        {question.type === "MULTIPLE_CHOICE" && (
          <div>
            {question.choices.map((choice: any) => (
              <div key={choice._id} className="mb-2">
                <input type="radio"
                  name={`q-${question._id}`}
                  value={choice._id}
                  checked={answers[question._id] === choice._id}
                  disabled={locked}
                  onChange={() => handleAnswerAndLock(question._id, choice._id)}
                  className="me-2" />
                {choice.text}
              </div>
            ))}
          </div>
        )}

        {question.type === "TRUE_FALSE" && (
          <div>
            <div className="mb-2">
              <input type="radio" name={`q-${question._id}`}
                checked={answers[question._id] === true}
                disabled={locked}
                onChange={() => handleAnswerAndLock(question._id, true)}
                className="me-2" />
              True
            </div>
            <div>
              <input type="radio" name={`q-${question._id}`}
                checked={answers[question._id] === false}
                disabled={locked}
                onChange={() => handleAnswerAndLock(question._id, false)}
                className="me-2" />
              False
            </div>
          </div>
        )}

        {question.type === "FILL_IN_BLANK" && (
          <div>
            <input className="form-control w-50"
              value={answers[question._id] || ""}
              disabled={locked}
              onChange={(e) => handleAnswer(question._id, e.target.value)}
              onBlur={() => {
                if (answers[question._id])
                  handleAnswerAndLock(question._id, answers[question._id]);
              }}
              placeholder="Your answer..." />
            {!locked && answers[question._id] && quiz.lockQuestionsAfterAnswering && (
              <button className="btn btn-sm btn-secondary mt-2"
                onClick={() => handleAnswerAndLock(question._id, answers[question._id])}>
                Confirm Answer
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="wd-quiz-preview" className="p-3">
      {isFaculty && (
        <div className="alert alert-warning">
          This is a preview of the published version of the quiz
        </div>
      )}
      <h3>{quiz.title}</h3>
      <p className="text-muted">Started: {new Date().toLocaleString()}</p>
      <h5>Quiz Instructions</h5>
      <p>{quiz.description}</p>
      <hr />

      {!submitted ? (
        <div>
          {timeLeft !== null && (
            <div className={`alert ${timeLeft < 60 ? "alert-danger" : "alert-info"} mb-3`}>
              ⏱ Time Remaining:{" "}
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              {timeLeft < 60 && " — Hurry up!"}
            </div>
          )}

          {/* All questions at once mode */}
          {showAll ? (
            <div>
              {shuffledQuestions.map((question, index) =>
                renderQuestion(question, index)
              )}
            </div>
          ) : (
            /* One question at a time mode */
            <div>
              {renderQuestion(q, currentQuestion)}
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  {currentQuestion > 0 && (
                    <button className="btn btn-secondary"
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                      ◀ Previous
                    </button>
                  )}
                  {currentQuestion < shuffledQuestions.length - 1 && (
                    <button className="btn btn-secondary"
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                      Next ▶
                    </button>
                  )}
                </div>
                <div className="border p-2">
                  <p className="mb-1 fw-bold">Questions</p>
                  <div className="d-flex gap-1 flex-wrap">
                    {shuffledQuestions.map((_: any, i: number) => (
                      <button key={i}
                        className={`btn btn-sm ${currentQuestion === i
                          ? "btn-danger"
                          : lockedQuestions.has(shuffledQuestions[i]._id)
                            ? "btn-success"
                            : "btn-outline-secondary"}`}
                        onClick={() => setCurrentQuestion(i)}>
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mt-3">
            <span className="text-muted">
              Quiz saved at {new Date().toLocaleTimeString()}
            </span>
            <button className="btn btn-secondary" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="alert alert-info">
            <h5>Score: {score} / {quiz.points}</h5>
            {!isFaculty && (
              <p className="mb-0">
                Attempt {attemptCount} of{" "}
                {quiz.multipleAttempts ? quiz.howManyAttempts : 1}
              </p>
            )}
          </div>

          {!showCorrect && !isFaculty && (
            <div className="alert alert-secondary">
              Correct answers are not available for this quiz.
            </div>
          )}

          {quiz.questions.map((question: any, index: number) => {
            const correct = isCorrect(question);
            const userAnswer = answers[question._id];
            return (
              <div key={question._id}
                className={`border p-3 mb-3 rounded ${correct ? "border-success" : "border-danger"}`}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Question {index + 1}</span>
                  <span className={correct ? "text-success" : "text-danger"}>
                    {correct ? "✓ Correct" : "✗ Incorrect"} — {question.points} pts
                  </span>
                </div>
                <p>{question.question}</p>
                <p><b>Your answer:</b>{" "}
                  {question.type === "TRUE_FALSE"
                    ? String(userAnswer)
                    : question.type === "MULTIPLE_CHOICE"
                      ? question.choices.find((c: any) => c._id === userAnswer)?.text || "No answer"
                      : userAnswer || "No answer"}
                </p>
                {showCorrect && !correct && (
                  <p className="text-success mb-0"><b>Correct answer:</b>{" "}
                    {question.type === "TRUE_FALSE"
                      ? String(question.correctAnswer)
                      : question.type === "MULTIPLE_CHOICE"
                        ? question.choices.find((c: any) => c.correct)?.text
                        : question.blanks?.join(", ")}
                  </p>
                )}
              </div>
            );
          })}

          <div className="d-flex gap-2">
            {canRetake() && (
              <button className="btn btn-danger" onClick={handleRetake}>
                Retake Quiz
              </button>
            )}
            {isFaculty && (
              <button className="btn btn-secondary"
                onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/edit`)}>
                Keep Editing This Quiz
              </button>
            )}
            <button className="btn btn-secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes`)}>
              Back to Quizzes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}