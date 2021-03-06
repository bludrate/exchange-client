import React from 'react'; // import react
import ReactDOM from 'react-dom';
import fetch from 'whatwg-fetch';
import {useRouterHistory, Router, Route, Link, IndexRoute} from 'react-router';
import { createHashHistory, useBasename } from 'history'
import Main from './components/main/main.jsx';
import Rates from './components/rates/rates.jsx';
import Auction from './components/auction/auction.jsx';
import FastClick from './js/vendor/fastclick';
import seo from './js/stores/seo';

let appHistory = useRouterHistory(createHashHistory)({ queryKey: false, basename: '/!' });

import './sass/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  FastClick.attach( document.body, {
    tapDelay: 1,
    tapTimeout: 500
  } );

  Router.prototype.componentDidMount =
  Router.prototype.componentDidUpdate = seo;

  ReactDOM.render(
      <Router history={appHistory}>
        <Route path="/" component={Main} >
          <IndexRoute component={Rates}/>
          <Route path="auction/:currency/:type" component={Auction}/>
        </Route>
      </Router>,
      document.getElementById('app')
  );
});