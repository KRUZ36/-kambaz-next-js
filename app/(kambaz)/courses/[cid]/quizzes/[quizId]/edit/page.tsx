"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    title: "Unnamed Quiz",
    description: "",
    quizType: "GRADED_QUIZ",
    points: 0,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    questions: [],
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findQuizById(quizId as string);
      if (data) setQuiz({
        ...data,
        dueDate: data.dueDate || "",
        availableDate: data.availableDate || "",
        untilDate: data.untilDate || "",
        description: data.description || "",
        accessCode: data.accessCode || "",
        questions: data.questions || [],
      });
    };
    fetch();
  }, [quizId]);

  const handleSave = async () => {
    await client.updateQuiz(quiz);
    router.push(`/courses/${cid}/quizzes/${quizId}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz({ ...quiz, published: true });
    await client.publishQuiz(quizId as string);
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end mb-2 text-muted">
        Points {quiz.points} &nbsp;
        {quiz.published
          ? <span className="text-success">● Published</span>
          : <span className="text-secondary">○ Not Published</span>}
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}>
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}>
            Questions
          </button>
        </li>
      </ul>

      {activeTab === "details" && (
        <div>
          <div className="mb-3">
            <input
              className="form-control"
              value={quiz.title || ""}
              placeholder="Quiz Title"
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Quiz Instructions</label>
            <textarea
              className="form-control"
              rows={4}
              value={quiz.description || ""}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-end">Quiz Type</label>
            <div className="col-sm-4">
              <select className="form-select"
                value={quiz.quizType || "GRADED_QUIZ"}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </select>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-end">Assignment Group</label>
            <div className="col-sm-4">
              <select className="form-select"
                value={quiz.assignmentGroup || "QUIZZES"}
                onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
          </div>

          <fieldset className="border p-3 mb-3">
            <legend className="w-auto px-2">Options</legend>

            <div className="mb-2">
              <input type="checkbox"
                checked={quiz.shuffleAnswers || false}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                className="me-2" />
              Shuffle Answers
            </div>

            <div className="mb-2 d-flex align-items-center">
              <input type="checkbox"
                checked={(quiz.timeLimit || 0) > 0}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })}
                className="me-2" />
              Time Limit
              <input type="number"
                className="form-control w-25 ms-2"
                value={quiz.timeLimit || 0}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })}
              />
              <span className="ms-2">Minutes</span>
            </div>

            <div className="mb-2">
              <input type="checkbox"
                checked={quiz.multipleAttempts || false}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                className="me-2" />
              Allow Multiple Attempts
            </div>

            {quiz.multipleAttempts && (
              <div className="mb-2 ms-4 d-flex align-items-center">
                <label className="me-2">How Many Attempts:</label>
                <input type="number"
                  className="form-control w-25"
                  min={1}
                  value={quiz.howManyAttempts || 1}
                  onChange={(e) => setQuiz({
                    ...quiz, howManyAttempts: Number(e.target.value)
                  })}
                />
              </div>
            )}

            <div className="mb-2 row mt-2">
              <label className="col-sm-4 col-form-label">Show Correct Answers</label>
              <div className="col-sm-4">
                <select className="form-select"
                  value={quiz.showCorrectAnswers || "immediately"}
                  onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}>
                  <option value="immediately">Immediately</option>
                  <option value="after_due_date">After Due Date</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>

            <div className="mb-2 row">
              <label className="col-sm-4 col-form-label">Access Code</label>
              <div className="col-sm-4">
                <input type="text"
                  className="form-control"
                  value={quiz.accessCode || ""}
                  placeholder="Leave blank for no code"
                  onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-2">
              <input type="checkbox"
                checked={quiz.oneQuestionAtATime || false}
                onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                className="me-2" />
              One Question at a Time
            </div>

            <div className="mb-2">
              <input type="checkbox"
                checked={quiz.webcamRequired || false}
                onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
                className="me-2" />
              Webcam Required
            </div>

            <div className="mb-2">
              <input type="checkbox"
                checked={quiz.lockQuestionsAfterAnswering || false}
                onChange={(e) => setQuiz({
                  ...quiz, lockQuestionsAfterAnswering: e.target.checked
                })}
                className="me-2" />
              Lock Questions After Answering
            </div>
          </fieldset>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-end">Due Date</label>
            <div className="col-sm-4">
              <input type="date" className="form-control"
                value={quiz.dueDate || ""}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-end">Available From</label>
            <div className="col-sm-4">
              <input type="date" className="form-control"
                value={quiz.availableDate || ""}
                onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })} />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-end">Until</label>
            <div className="col-sm-4">
              <input type="date" className="form-control"
                value={quiz.untilDate || ""}
                onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-secondary" onClick={handleSaveAndPublish}>
          Save & Publish
        </button>
        <button className="btn btn-danger" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

function QuestionsEditor({ quiz, setQuiz }: { quiz: any; setQuiz: any }) {
  const addQuestion = () => {
    const newQuestion = {
      _id: Date.now().toString(),
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      points: 1,
      question: "",
      choices: [
        { _id: "1", text: "", correct: false },
        { _id: "2", text: "", correct: false },
      ],
      correctAnswer: true,
      blanks: [""],
      editing: true,
    };
    setQuiz({
      ...quiz,
      questions: [...(quiz.questions || []), newQuestion]
    });
  };

  const updateQuestion = (updated: any) => {
    const updatedQuestions = (quiz.questions || []).map((q: any) =>
      q._id === updated._id ? updated : q
    );
    setQuiz({
      ...quiz,
      questions: updatedQuestions,
      points: updatedQuestions.reduce(
        (sum: number, q: any) => sum + (q.points || 0), 0),
    });
  };

  const deleteQuestion = (questionId: string) => {
    const remaining = (quiz.questions || []).filter(
      (q: any) => q._id !== questionId);
    setQuiz({
      ...quiz,
      questions: remaining,
      points: remaining.reduce(
        (sum: number, q: any) => sum + (q.points || 0), 0),
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={addQuestion}>
          + New Question
        </button>
      </div>
      {(quiz.questions || []).length === 0 && (
        <p className="text-muted text-center">
          No questions yet. Click + New Question to add one.
        </p>
      )}
      {(quiz.questions || []).map((question: any) => (
        <QuestionEditor
          key={question._id}
          question={question}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
        />
      ))}
    </div>
  );
}

function QuestionEditor({ question, onUpdate, onDelete }: any) {
  const [q, setQ] = useState(question);
  const [editing, setEditing] = useState(question.editing || false);

  const handleSave = () => {
    onUpdate({ ...q, editing: false });
    setEditing(false);
  };

  const handleCancel = () => {
    setQ(question);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="border p-3 mb-3 rounded">
        <div className="d-flex justify-content-between">
          <span className="fw-bold">{q.title}</span>
          <div>
            <span className="me-3">{q.points} pts</span>
            <button className="btn btn-sm btn-secondary me-2"
              onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-sm btn-danger"
              onClick={() => onDelete(q._id)}>Delete</button>
          </div>
        </div>
        <div className="text-muted small">{q.type?.replace(/_/g, " ")}</div>
        <p className="mt-2">{q.question}</p>
      </div>
    );
  }

  return (
    <div className="border p-3 mb-3 rounded">
      <div className="d-flex gap-2 mb-3 align-items-center">
        <input className="form-control w-25"
          value={q.title || ""}
          onChange={(e) => setQ({ ...q, title: e.target.value })}
          placeholder="Question Title" />
        <select className="form-select w-25"
          value={q.type || "MULTIPLE_CHOICE"}
          onChange={(e) => setQ({ ...q, type: e.target.value })}>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_IN_BLANK">Fill in the Blank</option>
        </select>
        <div className="d-flex align-items-center">
          <span className="me-2">pts:</span>
          <input type="number" className="form-control"
            style={{ width: "70px" }}
            value={q.points || 0}
            onChange={(e) => setQ({ ...q, points: Number(e.target.value) })} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Question:</label>
        <textarea className="form-control" rows={3}
          value={q.question || ""}
          onChange={(e) => setQ({ ...q, question: e.target.value })} />
      </div>

      {q.type === "MULTIPLE_CHOICE" && (
        <div>
          <label className="form-label fw-bold">Answers:</label>
          <p className="text-muted small">
            Select the radio button next to the correct answer.
          </p>
          {(q.choices || []).map((choice: any, index: number) => (
            <div key={choice._id} className="d-flex align-items-center mb-2">
              <input type="radio"
                name={`correct-${q._id}`}
                checked={choice.correct}
                onChange={() => setQ({
                  ...q,
                  choices: q.choices.map((c: any, i: number) => ({
                    ...c, correct: i === index
                  }))
                })}
                className="me-2" />
              <input className="form-control me-2"
                value={choice.text || ""}
                placeholder={choice.correct ? "Correct Answer" : "Possible Answer"}
                onChange={(e) => setQ({
                  ...q,
                  choices: q.choices.map((c: any, i: number) =>
                    i === index ? { ...c, text: e.target.value } : c
                  )
                })} />
              <button className="btn btn-sm btn-danger"
                onClick={() => setQ({
                  ...q,
                  choices: q.choices.filter((_: any, i: number) => i !== index)
                })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-secondary mt-2"
            onClick={() => setQ({
              ...q,
              choices: [...(q.choices || []),
              { _id: Date.now().toString(), text: "", correct: false }]
            })}>
            + Add Another Answer
          </button>
        </div>
      )}

      {q.type === "TRUE_FALSE" && (
        <div>
          <label className="form-label fw-bold">Correct Answer:</label>
          <div className="d-flex gap-3 mt-2">
            <div className="d-flex align-items-center">
              <input type="radio"
                name={`tf-${q._id}`}
                checked={q.correctAnswer === true}
                onChange={() => setQ({ ...q, correctAnswer: true })}
                className="me-2" />
              <span className={q.correctAnswer === true
                ? "text-success fw-bold" : ""}>True</span>
            </div>
            <div className="d-flex align-items-center">
              <input type="radio"
                name={`tf-${q._id}`}
                checked={q.correctAnswer === false}
                onChange={() => setQ({ ...q, correctAnswer: false })}
                className="me-2" />
              <span className={q.correctAnswer === false
                ? "text-success fw-bold" : ""}>False</span>
            </div>
          </div>
        </div>
      )}

      {q.type === "FILL_IN_BLANK" && (
        <div>
          <label className="form-label fw-bold">Possible Correct Answers:</label>
          <p className="text-muted small">
            Add all possible correct answers. Answers are case insensitive.
          </p>
          {(q.blanks || []).map((blank: string, index: number) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <input className="form-control me-2"
                value={blank || ""}
                placeholder="Possible Answer"
                onChange={(e) => setQ({
                  ...q,
                  blanks: q.blanks.map((b: string, i: number) =>
                    i === index ? e.target.value : b
                  )
                })} />
              <button className="btn btn-sm btn-danger"
                onClick={() => setQ({
                  ...q,
                  blanks: q.blanks.filter((_: string, i: number) => i !== index)
                })}>✕</button>
            </div>
          ))}
          <button className="btn btn-sm btn-secondary mt-2"
            onClick={() => setQ({ ...q, blanks: [...(q.blanks || []), ""] })}>
            + Add Another Answer
          </button>
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={handleSave}>
          Update Question
        </button>
      </div>
    </div>
  );
}