import React from 'react';
import config from '../../js/config';
import Rate from '../rate/rate.jsx';

import './rates.scss';

class Rates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: true,
            currencies: []
        };

        this.refreshDelay = 2 * 60 * 1000; //every 2 minutes
    }

    componentDidMount() {
        //this.initRate();
    }

    initRate() {
        this.getRates().then((rates) => {
            this.setState({
                pending: false,
                currencies: rates
            });

            setTimeout(this.initRate.bind(this), this.refreshDelay);
        }, (err) => {
            console.error(err);
            setTimeout(this.initRate.bind(this), 500);
        });
    }

    getRates() {
        return fetch(config.URLS.SERVER + '/rates?city=kiev').then((res) => res.json());
    }

    processRates() {
        if ( this.state.pending ) {
            return ;
        }

        var res = [];

        for (let cur in this.state.currencies) {
            res.push(<Rate key={cur} data={this.state.currencies[cur]} currency={cur}/>);
        }

        return res;
    }

    render() {
        return <ul className={'rates' + (this.state.pending ? 'spinner' : '')}>{this.processRates()}</ul>;
    }
}

export default Rates;