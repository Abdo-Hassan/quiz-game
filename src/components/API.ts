import { Difficulty } from '../types/quizDataTypes';
import axios from 'axios';

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await axios.get(endPoint).then((res) => {
    console.log(res);
  });
  return data;
};
