import React from 'react';

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="auction__item">{JSON.stringify(this.props)}</div>;
  }
}

export default AuctionItem;