import {
  QUESTION_NOT_FOUND,
  REMOVE_QUESTION,
  SET_QUESTION_CONTENT,
} from "../actions/commentAction";
import { QuestionDetailModel } from "../model/questionModel";

interface QuestionState {
  question: QuestionDetailModel | null;
  isNotFound: boolean;
}

const initQuestionState: QuestionState = {
  question: null,
  isNotFound: false,
};

interface PostAction {
  type: string;
  payload: QuestionState | null;
}

const questionReducer = (state = initQuestionState, action: PostAction) => {
  switch (action.type) {
    case SET_QUESTION_CONTENT:
      return {
        question: action.payload?.question,
        isNotFound: false,
      };
    case QUESTION_NOT_FOUND:
      return {
        question: null,
        isNotFound: true,
      };
    case REMOVE_QUESTION:
      return {
        question: null,
        isNotFound: false,
      };
    default:
      return state;
  }
};

export default questionReducer;
