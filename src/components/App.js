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
import { useQuizContext } from '../context/QuizContext';

export default function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Start />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <ResultScore />}
      </Main>
    </div>
  );
}
