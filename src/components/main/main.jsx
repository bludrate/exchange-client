import React from 'react';
import Header from '../header/header.jsx';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header />
            {this.props.children}
        </div>;
    }
}

export default Main;