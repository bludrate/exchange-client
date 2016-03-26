import React from 'react';
import AuctionStore from '../../js/stores/auctionStore';

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);

    this.messageSlice = 100;

    this.state = {
      messageSlice: this.messageSlice
    }
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

  message(message) {
    if (!this.state.messageSlice || message.length <= this.state.messageSlice) {
      return message;
    } else {
      return message.slice(0, this.state.messageSlice) + '...';
    }
  }

  toggleMessage() {
    this.setState({
      messageSlice: this.state.messageSlice ? undefined : this.messageSlice
    });
  }
//{JSON.stringify(this.props)}
  render() {
    return <li className="auction__item">
      <div className="auction__data">
        <span className="auction__time">{this.props.data.time}</span>
        <span className="auction__rate">{this.props.data.rate}</span>
        <div className="auction__sum">
          <strong className="auction__sum-value">{this.props.data.sum}$</strong>
          <span className="auction__price">{Math.round(this.props.data.sum * this.props.data.rate)}грн</span>
        </div>
        <a className="auction__call" onClick={this.getPhone.bind(this)}><i className="icon-phone"></i>{this.props.data.phone.number}</a>
      </div>
      <div className="auction__message" onClick={this.toggleMessage.bind(this)}>{this.message(this.props.data.message)}</div>
    </li>;
  }
}

export default AuctionItem;