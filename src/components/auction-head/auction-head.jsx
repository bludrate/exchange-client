import React from 'react';
import appConstants from '../../js/constants/appConstants';

class AuctionHead extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: {}
        }
    }

    changeSort(head) {
        if (head === this.state.sort.head) {
            this.state.sort.value = !this.state.sort.value;
        } else {
            this.state.sort = {
                head: head,
                value: true
            };
        }

        this.props.onSort(this.state.sort);
    }

    render() {
        return <header className="auction-head">
            <div className="auction__data">
                <span className="icon-clock auction__time" onClick={this.changeSort.bind(this, 'time')}></span>
                <span className="auction__rate" onClick={this.changeSort.bind(this, 'rate')}><i>курс</i></span>
                <span className="auction__sum" onClick={this.changeSort.bind(this, 'sum')}><i>сумма</i></span>
            </div>
            <div>Сообщение</div>
        </header>;
    }
}

export default AuctionHead;