import React from 'react';
import AuctionStore from '../../js/stores/auctionStore';
import appConstants from '../../js/constants/appConstants';
import AuctionItem from '../auction-item/auction-item.jsx';
import AuctionHead from '../auction-head/auction-head.jsx';

import './auction.scss';

class Auction extends React.Component {
    constructor(props) {
        super(props);

        this.refreshDelay = 2 * 60 * 1000; //every 2 minutes

        this.state = {
            sort: {}
        };

        this.bindListeners();
    }

    bindListeners() {
        this.onAuctionUpdate = () => {
            this.forceUpdate()
        };
        AuctionStore.addChangeListener(this.onAuctionUpdate);
    }

    componentDidMount() {
        AuctionStore.init(this.props.params.currency, this.props.params.type);
    }

    componentWillUnmount() {
        AuctionStore.stop();
        AuctionStore.removeChangeListener(this.onAuctionUpdate);
    }

    onSort(data) {
        this.setState({
            sort: data
        });
    }

    sortData(list) {
        var sortHead = this.state.sort.head;
        var sortValue = this.state.sort.value;

        if (!sortHead) {
            return list;
        }

        if (sortHead === 'time') {
            if (!sortValue) {
                list.reverse();
            }
        } else {
            list.sort(function(a, b) {
                if (sortValue) {
                    return b[sortHead] - a[sortHead];
                } else {
                    return a[sortHead] - b[sortHead];
                }
            });
        }

        return list;
    }

    renderItems() {
        var list = AuctionStore.getData().slice();
        if (!list.length) {
            return <div>...</div>;
        }

        return this.sortData(list).map((item, index) => <AuctionItem currency={this.props.params.currency} key={index} data={item}/>)
    }

    render() {
        return <section className="auction">
            <AuctionHead onSort={this.onSort.bind(this)}/>
            <ul className="auction-list">
                {this.renderItems()}
            </ul>
        </section>;
    }
}

export default Auction;