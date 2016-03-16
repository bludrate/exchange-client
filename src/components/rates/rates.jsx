import React from 'react';
import appConstants from '../../js/constants/appConstants';
import Rate from '../rate/rate.jsx';
import RatesStore from '../../js/stores/ratesStore';

import './rates.scss';

class Rates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: []
        };

        this.refreshDelay = 2 * 60 * 1000; //every 2 minutes

        this.bindListeners();
    }

    bindListeners() {
        this.onRatesUpdate = this.onRatesUpdate.bind(this);

        RatesStore.addChangeListener(this.onRatesUpdate);
    }

    onRatesUpdate() {
        this.setState({
            rates: RatesStore.getRates()
        });
    }

    componentDidMount() {
        RatesStore.init();
    }

    componentWillUnmount() {
        RatesStore.stop();
        RatesStore.removeChangeListener(this.onRatesUpdate);
    }

    processRates() {
        var res = [];

        for (let cur in this.state.rates) {
            res.push(<Rate key={cur} data={this.state.rates[cur]} currency={cur}/>);
        }

        return res;
    }

    render() {
        return <ul className='rates'>{this.processRates()}</ul>;
    }
}

export default Rates;