import { useEffect } from 'react';
import { useQuizContext } from '../context/QuizContext';

function Timer() {
  const { secondsRemaining, dispatch } = useQuizContext();
  const minute = Math.floor(secondsRemaining / 60) + '';
  const seconds = (secondsRemaining % 60) + '';

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: 'tick' });
      }, 1000);
      return e => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {minute.padStart(2, '0')} : {seconds.padStart(2, '0')}
    </div>
  );
}

export default Timer;
