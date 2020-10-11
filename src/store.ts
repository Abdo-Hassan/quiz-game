import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { questionsReducer } from './redux/quizReducer';

export type RootStore = ReturnType<typeof questionsReducer>;

export const store = createStore(
  questionsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
