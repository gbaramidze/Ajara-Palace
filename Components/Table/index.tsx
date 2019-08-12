import * as React from 'react'
import * as PropTypes from 'prop-types';
import {iTable} from "./interface";
const style = require('./style.scss');

export default class Table extends React.Component {
    static propTypes = {
        coords: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    props: iTable;
    constructor(props) {
        super(props);
        this.props = props;
    }

    render(): React.ReactElement {
        const { type, number , coords } = this.props;
        const explode = coords.split(":");
        const top = explode[1];
        const left = explode[0];
        return type !== 'undefined' && <div className={`${style.rtable} ${style[type]}`} style={{top: `${top}px`, left: `${left}px`}} onClick={this.props.onClick}>
            <span>{number}</span>
        </div>
    }
}
