import * as React from 'react';

class View extends React.Component {
    state = {
        status: '1111'
    };
    props: any;
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount(): void {
        this.setState( {
            status: this.props.status
        })
    }

    render() {
        const {status} = this.state;
        return <div>view component {status}</div>
    }
}

export default View;
