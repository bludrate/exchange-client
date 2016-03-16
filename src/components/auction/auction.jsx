import React from 'react';
import CityStore from '../../js/stores/cityStore';
import appConstants from '../../js/constants/appConstants';
import AuctionItem from '../auction-item/auction-item.jsx';

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
            return 'loading or empty';
        }

        return this.state.list.map((item, index) => <AuctionItem key={index} data={item}/>)
    }

    render() {
        return <div className="auction">
            {this.renderItems()}
        </div>;
    }
}

export default Auction;