import React from 'react';
import { Link, Router } from 'react-router';

class GaLink extends React.Component {
  constructor(props) {
    super(props);
  }

  processClick() {
    ga('send', 'event', 'Navigation', location.hash, this.props.source);
  }

  render() {
    return <Link to={this.props.to} className={this.props.className} onClick={this.processClick.bind(this)}>{this.props.children}</Link>
  }
}

export default GaLink;