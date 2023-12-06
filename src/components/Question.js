import { useQuizContext } from '../context/QuizContext';
import Options from './Options';

function Question() {
  const { curQuestion } = useQuizContext();
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
