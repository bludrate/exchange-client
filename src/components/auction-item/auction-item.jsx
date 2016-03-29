import React from 'react';
import AuctionStore from '../../js/stores/auctionStore';

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);

    this.currencies = {
      rub: '₽',
      eur: '€',
      usd: '$'
    };
    this.init();
  }

  init() {
    var sum = this.props.data.sum;
    var postfix;

    if ( sum >= 1000000 ) {
      sum = Math.ceil(sum/1000000);
      postfix = <sup>млн.</sup>;
    }

    if ( sum >= 1000 ) {
      sum = Math.ceil(sum/1000);
      postfix = <sup>тыс.</sup>;
    }

    this.postfix = postfix;
    this.sum = sum;
    this.currency = this.currencies[this.props.currency];
  }

  componentWillReceiveProps() {
    this.init();
  }

  getPhone(event) {
    var link = event.currentTarget;
    if (this.phone) return ;
    AuctionStore.fetchPhone(this.props.data.phone.bid).then((numberPart) => {
      var number = this.props.data.phone.number;

      number = number.replace('XXX-X', numberPart);

      this.phone = true;
      this.props.data.phone.number = number;

      link.href = 'tel:' + number.replace(/-| /g, '');
      link.click();

      this.forceUpdate();
    });

    event.preventDefault();
  }

//{JSON.stringify(this.props)}
  render() {
    return <li className="auction__item">
      <div className="auction__data">
        <span className="auction__time">{this.props.data.time}</span>
        <span className="auction__rate">{this.props.data.rate}</span>
        <div className="auction__sum">
          <strong className="auction__sum-value">{this.sum}{this.postfix}{this.currency}</strong>
          <span className="auction__price">{Math.round(this.props.data.sum * this.props.data.rate)}грн</span>
        </div>
        <a className="auction__call" onClick={this.getPhone.bind(this)}><i className="icon-phone"></i>{this.props.data.phone.number}</a>
      </div>
      <div className="auction__message">{this.props.data.message}</div>
    </li>;
  }
}

export default AuctionItem;