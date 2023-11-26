import Options from './Options';

function Question({ curQuestion, dispatch, answer }) {
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options curQuestion={curQuestion} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
