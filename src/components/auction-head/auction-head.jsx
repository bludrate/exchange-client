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

    className(className, head) {
        var res = className || '';

        if ( this.state.sort.head === head ) {
            res += ' sort-ico_' + (this.state.sort.value ? 'asc' : 'desc');
        }

        return res;
    }

    render() {
        return <header className="auction-head">
            <div className="auction__data">
                <span className={this.className('icon-clock auction__time', 'time')} onClick={this.changeSort.bind(this, 'time')}></span>
                <span className={this.className('auction__rate', 'rate')} onClick={this.changeSort.bind(this, 'rate')}><i>курс</i></span>
                <span className={this.className('auction__sum', 'sum')} onClick={this.changeSort.bind(this, 'sum')}><i>сумма</i></span>
            </div>
            <span>Сообщение</span>
        </header>;
    }
}

export default AuctionHead;