import React from 'react';
import ReactDOM from 'react-dom';
import ReadableApp from './App';
import { Provider } from 'react-redux';
import store from './storage';

ReactDOM.render(
  <Provider store={store}>
    <ReadableApp />
  </Provider>,
  document.getElementById('root'));
