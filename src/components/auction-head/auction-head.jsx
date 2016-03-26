import React from 'react';
import appConstants from '../../js/constants/appConstants';

class AuctionHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <header className="auction-head">
            <div className="auction__data">
                <span className="icon-clock auction__time"></span>
                <span className="auction__rate">курс</span>
                <span className="auction__sum">сумма</span>
            </div>
        </header>;
    }
}

export default AuctionHead;