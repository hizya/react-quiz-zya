function ResultScore({ points, totalScore, highScore, dispatch }) {
  const percentage = Math.ceil((points / totalScore) * 100);

  let emoji;
  if (percentage === 100) emoji = '🏅';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '😐';
  if (percentage > 0 && percentage < 50) emoji = '😥';
  if (percentage === 0) emoji = '😅';

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
        {totalScore} ({percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn-ui  btn"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default ResultScore;
