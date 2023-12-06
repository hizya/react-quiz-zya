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

export default function App() {
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
