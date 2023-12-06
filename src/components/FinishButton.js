import { useQuizContext } from '../context/QuizContext';

function FinishButton() {
  const { dispatch, answer } = useQuizContext();

  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'finished' })}
    >
      Finish
    </button>
  );
}

export default FinishButton;
