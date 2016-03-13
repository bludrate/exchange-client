import React from 'react';

class Auction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.getAuctionData(cityService.city, this.props.params.currency, this.props.params.type).then((list) => {
            this.setState({
                pending: false,
                list: list
            });

            setTimeout(this.initRate.bind(this), this.refreshDelay);
        }, (err) => {
            console.error(err);
            setTimeout(this.initRate.bind(this), 500);
        });
    }

    getAuctionData() {
        return fetch(config.URLS.SERVER + '/rates?city=kiev').then((res) => res.json());
    }

    render() {
        return <div className="auction">

        </div>;
    }
}

export default Auction;