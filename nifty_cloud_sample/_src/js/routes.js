import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import Game from './components/Game.jsx';
import Ranking from './components/Ranking.jsx';

const Routes = (
  <Route component={App}>
    <Route path="/" component={Game} />
    <Route path="/game" component={Game} />
    <Route path="/ranking" component={Ranking} />
  </Route>
  
);
export default Routes;