import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AttemptsDao() {
  const saveAttempt = (attempt) => {
    const newAttempt = { ...attempt, _id: uuidv4(), submittedAt: new Date() };
    return model.create(newAttempt);
  };

  const findLastAttempt = (quizId, userId) =>
    model.findOne({ quiz: quizId, user: userId })
      .sort({ submittedAt: -1 });

  const countAttempts = (quizId, userId) =>
    model.countDocuments({ quiz: quizId, user: userId });

  return { saveAttempt, findLastAttempt, countAttempts };
}