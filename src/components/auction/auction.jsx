import React from 'react';
import CityStore from '../../js/stores/cityStore';
import appConstants from '../../js/constants/appConstants';
import AuctionItem from '../auction-item/auction-item.jsx';
import AuctionHead from '../auction-head/auction-head.jsx';

import './auction.scss';

class Auction extends React.Component {
    constructor(props) {
        super(props);

        this.refreshDelay = 2 * 60 * 1000; //every 2 minutes

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    init() {
        this.getAuctionData(CityStore.getCurrentCity(), this.props.params.currency, this.props.params.type).then((list) => {
            this.setState({
                list: list
            });

            this.timeout = setTimeout(this.init.bind(this), this.refreshDelay);
        }, (err) => {
            console.error(err);
            this.timeout = setTimeout(this.init.bind(this), 500);
        });
    }

    getAuctionData() {
        var data = {
            city: CityStore.getCurrentCity(),
            currency: this.props.params.currency,
            type: this.props.params.type
        };

        var query = [];

        for (let key in data) {
            query.push( key + '=' + data[key] );
        }

        return fetch(appConstants.URLS.SERVER + '/auction?' + query.join('&') ).then((res) => res.json());
    }

    renderItems() {
        if (!this.state.list.length) {
            return <div>'loading or empty'</div>;
        }

        return this.state.list.map((item, index) => <AuctionItem key={index} data={item}/>)
    }

    render() {
        return <section className="auction">
            <AuctionHead/>
            <ul className="auction-list">
                {this.renderItems()}
            </ul>
        </section>;
    }
}

export default Auction;