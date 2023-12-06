import { useQuizContext } from '../context/QuizContext';

function Progress() {
  const { points, totalScore, numQuestions, curIndex, answer } =
    useQuizContext();
  return (
    <header className="progress">
      <progress max={numQuestions} value={curIndex + Number(answer != null)} />
      <span>
        Question <strong>{curIndex + 1}</strong> / {numQuestions}
      </span>
      <span>
        <strong>{points}</strong> / {totalScore}
      </span>
    </header>
  );
}

export default Progress;
