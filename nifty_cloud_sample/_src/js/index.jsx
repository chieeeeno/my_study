import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes.js';

import createFinalStore from './stores/SampleStore';

const store = createFinalStore();
const rootElement = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <Router children={routes} history={hashHistory} />
  </Provider>
),rootElement);