import { createContext, useContext } from 'react';

const QuizContext = new createContext();

function QuizProvider({ children }) {
  return <QuizContext.QuizProvider>{children}</QuizContext.QuizProvider>;
}

function useQuizContext() {
  const context = useContext();

  if (context === undefined)
    throw new Error('you use the QuizContext outside the provider');
  return context;
}

export { QuizProvider, useQuizContext };
