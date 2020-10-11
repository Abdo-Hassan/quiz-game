import { AnswerObject, QuestionState } from './quizDataTypes';
export const TRIVIA_SUCCESS = 'TRIVIA_SUCCESS';
export const TRIVIA_FAIL = 'TRIVIA_FAIL';
export const GET_ANSWERS = 'GET_ANSWERS';
export const GET_USER_ANSWER = 'GET_USER_ANSWER';
export const RESET_USER_ANSWER = 'RESET_USER_ANSWER';

// !start trivia
export interface triviaSuccess {
  type: typeof TRIVIA_SUCCESS;
  payload: QuestionState;
}

export type triviaFail = {
  type: typeof TRIVIA_FAIL;
};
export interface getAnswers {
  type: typeof GET_ANSWERS;
  payload: AnswerObject;
}

// !check answer
export type getUserAnswer = {
  type: typeof GET_USER_ANSWER;
};

export type resetUserAnswer = {
  type: typeof RESET_USER_ANSWER;
};

export type QuestionsDispatchTypes =
  | triviaSuccess
  | triviaFail
  | getAnswers
  | getUserAnswer
  | resetUserAnswer;
