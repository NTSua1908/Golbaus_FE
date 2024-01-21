import { QuestionDetailModel } from "../model/questionModel";

export const SET_QUESTION_CONTENT = "SET_QUESTION_CONTENT";
export const QUESTION_NOT_FOUND = "QUESTION_NOT_FOUND";
export const REMOVE_QUESTION = "REMOVE_QUESTION";

export const setQuestionContent = (question: QuestionDetailModel) => {
  return {
    type: SET_QUESTION_CONTENT,
    payload: {
      question,
    },
  };
};

export const quesionNotFound = () => {
  return {
    type: QUESTION_NOT_FOUND,
  };
};

export const removeQuestion = () => {
  return {
    type: REMOVE_QUESTION,
  };
};
