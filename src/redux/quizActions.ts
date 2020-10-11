import { Question } from '../types/quizDataTypes';
import { Dispatch } from 'redux';
import { Difficulty } from '../types/quizDataTypes';
import axios from 'axios';
import { shuffleArray } from '../components/utilis';
import {
  QuestionsDispatchTypes,
  GET_USER_ANSWER,
} from '../types/quizActionTypes';
import {
  TRIVIA_FAIL,
  TRIVIA_SUCCESS,
  RESET_USER_ANSWER,
} from '../types/quizActionTypes';

export const startTriviaAction = (amount: number, difficulty: Difficulty) => {
  return async (dispatch: Dispatch<QuestionsDispatchTypes>) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await axios.get(endPoint);
    const result = response.data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));

    try {
      dispatch({ type: TRIVIA_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: TRIVIA_FAIL });
    }
  };
};

export const getUserAnswer = (answerObject: object) => {
  return (dispatch: Dispatch<QuestionsDispatchTypes>) => {
    dispatch({ type: GET_USER_ANSWER, payload: answerObject });
  };
};

export const resetUserAnswer = (dispatch: Dispatch<QuestionsDispatchTypes>) => {
  dispatch({ type: RESET_USER_ANSWER });
};
