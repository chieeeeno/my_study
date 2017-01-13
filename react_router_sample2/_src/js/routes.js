import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import Page1 from './components/Page1.jsx';
import Page2 from './components/Page2.jsx';
import Page3 from './components/Page3.jsx';

const Routes = (
  <Route component={App}>
    <Route path="/" component={Page1} />
    <Route path="page1/:level" component={Page1} />
    <Route path="page2/:id/:id2" component={Page2} />
    <Route path="page3/:level" component={Page3} />
    <Route path="*" component={Page1}/>
  </Route>
  
);
export default Routes;