import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { categoriesReducer, commentsReducer, postsReducer} from './reducers';
import Home from "./pages/Home";
import {Route} from "react-router";
import "./styles.css"
import Post from "./pages/Post";
import CategoriesBar from "./components/CategoriesBar";


const reducer = combineReducers({
  categoriesReducer,
  commentsReducer,
  postsReducer,
  router: routerReducer,
});

const history = createHistory();

const middleware = [thunkMiddleware, routerMiddleware(history)];

const store = createStore(reducer, applyMiddleware(...middleware));


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container">
        <CategoriesBar ></CategoriesBar>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:category" component={Home} />
        <Route path="/:category/:post_id" component={Post} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
