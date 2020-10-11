import React, { MouseEvent, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { Difficulty } from './types/quizDataTypes';
import {
  getUserAnswer,
  startTriviaAction,
  resetUserAnswer,
} from './redux/quizActions';
import { RootStore } from './store';
import QuizIcon from './assets/images/quiz.png';
import './App.css';

const TOTAL_QUESTIONS = 10;
function App() {
  const [startGame, setStartGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  const questions = useSelector((state: RootStore) => state.questions);
  const userAnswers = useSelector((state: RootStore) => state.userAnswers);
  const dispatch = useDispatch();

  const startTrivia = async () => {
    setGameOver(false);
    setLoading(true);
    let questionsData = await dispatch(
      startTriviaAction(TOTAL_QUESTIONS, Difficulty.EASY)
    );
    setScore(0);
    dispatch(resetUserAnswer);
    setQuestionNumber(0);
    setLoading(false);
    setStartGame(true);
    return questionsData;
  };

  const checkAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      // check the corrent Answer
      const correct = questions[questionNumber].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      dispatch(getUserAnswer([...userAnswers, answerObject]));
    }
  };

  const nextQuestion = () => {
    // move to next question
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
      setStartGame(false);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  console.log('userAnswers', userAnswers);

  return (
    <div className='container'>
      <div className='overlay'>
        <div className='wrapper'>
          <h1 className='title'>Quiz Game</h1>
          {/* start  Quiz App */}
          {!startGame || userAnswers.length === TOTAL_QUESTIONS + 1 ? (
            <button className='start-quiz' onClick={startTrivia}>
              <img src={QuizIcon} alt='quiz' />
              Start Quiz
            </button>
          ) : null}
          {/* user score */}
          {startGame && !gameOver && (
            <p className='score'>
              Score : <span>{score}</span>
            </p>
          )}
          {/* loading */}
          {loading && (
            <div className='lds-ring'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          {/* Questions Card */}
          {!loading && startGame && !gameOver && (
            <QuestionCard
              questionNumber={questionNumber + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[questionNumber].question}
              answers={questions[questionNumber].answers}
              userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
              checkAnswer={checkAnswer}
            />
          )}
          {/* Next Questions */}
          {startGame &&
            !loading &&
            !gameOver &&
            userAnswers.length === questionNumber + 1 && (
              <button className='next-question' onClick={nextQuestion}>
                Next Question
              </button>
            )}
          {gameOver && !startGame && (
            <div className='results'>
              <div>
                <p className='score'>Score :</p>
                <p className='correct-answer'>Correct Answers :</p>
                <p className='wrong-answer'>Wrong Answers :</p>
              </div>
              <div>
                <p className='score'>
                  <span>
                    {score} {''}
                  </span>
                  {score >= 5 ? (
                    <span role='img' aria-label='heart face'>
                      😍
                    </span>
                  ) : (
                    <span role='img' aria-label='sad face'>
                      😢
                    </span>
                  )}
                </p>
                <p className='correct-answer' style={{ color: '#28df99' }}>
                  {score}
                </p>
                <p className='wrong-answer' style={{ color: '#ff414d' }}>
                  {TOTAL_QUESTIONS - score}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
