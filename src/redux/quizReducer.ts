import { QuestionsState } from '../types/quizDataTypes';
import {
  TRIVIA_SUCCESS,
  TRIVIA_FAIL,
  GET_USER_ANSWER,
  RESET_USER_ANSWER,
} from '../types/quizActionTypes';

const INIT_STATE = {
  questions: [],
  userAnswers: [],
};

export const questionsReducer = (
  state: QuestionsState = INIT_STATE,
  action: any
) => {
  switch (action.type) {
    case TRIVIA_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };

    case TRIVIA_FAIL:
      return { ...state, questions: [] };

    case GET_USER_ANSWER:
      return {
        ...state,
        userAnswers: action.payload,
      };

    case RESET_USER_ANSWER:
      return {
        ...state,
        userAnswers: [],
      };

    default:
      return state;
  }
};
