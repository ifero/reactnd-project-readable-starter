import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { categoriesReducer, postsReducer } from '../reducers';

const reducer = combineReducers({
  categoriesReducer,
  postsReducer,
});


const store = applyMiddleware(thunkMiddleware)(createStore);

export default store(reducer);