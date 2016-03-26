import React from 'react'; // import react
import ReactDOM from 'react-dom';
import fetch from 'whatwg-fetch';
import {browserHistory, Router, Route, Link, IndexRoute} from 'react-router';
import Main from './components/main/main.jsx';
import Rates from './components/rates/rates.jsx';
import Auction from './components/auction/auction.jsx';

import './sass/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <Router history={browserHistory}>
        <Route path="/" component={Main} >
          <IndexRoute component={Rates}/>
          <Route path="auction/:currency/:type" component={Auction}/>
        </Route>
      </Router>,
      document.getElementById('app')
  );
});