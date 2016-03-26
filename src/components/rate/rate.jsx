import React from 'react';
import { Link } from 'react-router';

class Rate extends React.Component {
    constructor(props) {
        super(props);
    }

    static get symbols() {
        return {
            usd: '$',
            rub: '₽',
            eur: '€'
        }
    };

    formatVal(val) {
        return val.toFixed(this.props.currency === 'rub' ? 3 : 2);
    }

    render() {
        return <li className="rate">
            <span className="rate__currency">{Rate.symbols[this.props.currency]}</span>
            <div className="rate__type">
                <Link to={`/auction/${this.props.currency}/buy`} className="rate__button">Покупают</Link>
                <strong className="rate__val">{this.formatVal(this.props.data.buy)}</strong>
            </div>
            <div className="rate__type">
                <Link to={`/auction/${this.props.currency}/sell`} className="rate__button" className="rate__button">Продают</Link>
                <strong className="rate__val">{this.formatVal(this.props.data.sell)}</strong>
            </div>
        </li>;
    }
}

export default Rate;