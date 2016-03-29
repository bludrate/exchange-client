import React from 'react'; // import react
import ReactDOM from 'react-dom';
import fetch from 'whatwg-fetch';
import {hashHistory, Router, Route, Link, IndexRoute} from 'react-router';
import Main from './components/main/main.jsx';
import Rates from './components/rates/rates.jsx';
import Auction from './components/auction/auction.jsx';
import FastClick from './js/vendor/fastclick';

import './sass/main.scss';

FastClick.attach( document.body, {
  tapDelay: 1,
  tapTimeout: 500
} );

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={Main} >
          <IndexRoute component={Rates}/>
          <Route path="auction/:currency/:type" component={Auction}/>
        </Route>
      </Router>,
      document.getElementById('app')
  );
});