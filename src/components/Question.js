import { useQuizContext } from '../context/QuizContext';
import Options from './Options';

function Question() {
  const { answer, curQuestion, dispatch } = useQuizContext();
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
