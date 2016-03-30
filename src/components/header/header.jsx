import React from 'react';
import { Route } from 'react-router';
import Link from '../link/link.jsx';

import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        title: ''
      }
    ];
  }

  render() {
    return <div className="header tabs">
      <h1><Link to="/" className="logo" source="logo"><i className="logo__ico">₴</i>валютная биржа</Link></h1>
    </div>;
  }
  /*<i className="logo__arrows">⇅</i>*/
}

export default Header;