function NextButton({ answer, dispatch, curIndex, numQuestions }) {
  if (answer === null) return null;

  console.log(curIndex, numQuestions - 1);

  if (curIndex < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'newQuestion' })}
      >
        Next
      </button>
    );

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'finished' })}
    >
      Finish
    </button>
  );
}

export default NextButton;
