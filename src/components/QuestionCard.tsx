import React, { MouseEvent } from 'react';
import {} from '../redux/quizActions';
import { AnswerObject } from '../types/quizDataTypes';

type QuestionProps = {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  checkAnswer: (e: MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  answers,
  userAnswer,
  checkAnswer,
}) => {
  return (
    <div className='question-card'>
      <p className='total-questions'>
        Question : {questionNumber} / {totalQuestions}
      </p>
      <p
        dangerouslySetInnerHTML={{ __html: question }}
        className='question'
      ></p>
      <div className='answers-container'>
        {answers.map((answer, index) => (
          <div key={index} className='answers'>
            <button
              disabled={!!userAnswer}
              value={answer}
              style={{
                color: '#fff',
                backgroundColor:
                  userAnswer?.correctAnswer === answer
                    ? 'green'
                    : userAnswer?.correctAnswer !== answer &&
                      userAnswer?.answer === answer
                    ? 'red'
                    : 'dodgerblue',
              }}
              onClick={checkAnswer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
