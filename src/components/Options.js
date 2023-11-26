export default function Options({ curQuestion, dispatch, answer }) {
  const isAnswered = answer !== null;

  return (
    <div className="options">
      {curQuestion.options.map((opt, i) => (
        <button
          className={`btn btn-option ${i === answer ? 'answer' : ''} ${
            isAnswered &&
            (i === curQuestion.correctOption ? 'correct' : 'wrong')
          }`}
          key={opt}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
          disabled={isAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
