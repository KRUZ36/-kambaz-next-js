import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${REMOTE_SERVER}/api`;

export const findAssignmentsForCourse = async (courseId) => {
  const response = await axios.get(`${API}/courses/${courseId}/assignments`);
  return response.data;
};

export const createAssignment = async (courseId, assignment) => {
  const response = await axios.post(
    `${API}/courses/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
  await axios.delete(`${API}/assignments/${assignmentId}`);
};

export const updateAssignment = async (assignmentId, assignment) => {
  await axios.put(`${API}/assignments/${assignmentId}`, assignment);
};