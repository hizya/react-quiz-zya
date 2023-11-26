import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Start from './Start';
import Loader from '../Loader';
import Error from './Error';
import Progress from './Progress';
import Question from './Question';
import ResultScore from './ResultScore';
import Footer from './Footer';
import Timer from './Timer';
import NextButton from './NextButton';

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // loading error ready active finished
  status: 'loading',

  curIndex: null,

  selectOption: null,

  answer: null,

  points: 0,

  highScore: 0,

  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading' };
    case 'error':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        curIndex: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'restart':
      return {
        ...initialState,
        highScore: state.highScore,
        status: 'ready',
        questions: state.questions,
      };
    case 'newAnswer':
      const question = state.questions.at(state.curIndex);
      const isCorrect = question.correctOption === action.payload;
      const newPoint = isCorrect
        ? question.points + state.points
        : state.points;
      return {
        ...state,
        answer: action.payload,
        points: newPoint,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case 'newQuestion':
      return { ...state, curIndex: state.curIndex + 1, answer: null };
    default:
      throw new Error('action unknown');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    status,
    questions,
    curIndex,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  useEffect(function () {}, []);

  // the number of the questions
  const numQuestions = questions.length;

  // compute the totalScore
  const totalScore = questions
    .map(ques => ques.points)
    .reduce((acc, s) => acc + s, 0);

  // the way of knowing which the curretn question is
  const curQuestion = questions.at(curIndex);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Start dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === 'active' && (
          <>
            <Progress
              points={points}
              totalScore={totalScore}
              numQuestions={numQuestions}
              curIndex={curIndex}
              answer={answer}
            />
            <Question
              curQuestion={curQuestion}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                curIndex={curIndex}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <ResultScore
            points={points}
            totalScore={totalScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
