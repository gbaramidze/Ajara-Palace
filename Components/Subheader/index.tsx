import * as React from 'react'
import * as PropTypes from 'prop-types';
import {Container} from "react-bootstrap";
const style = require("./style.scss");

interface iSubheader {
    img: string,
    title: string
}
export default class Subheader extends React.Component {
    static propTypes = {
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };
    props: iSubheader;
    constructor(props) {
        super(props);
        this.props = props;
    }
    render(): React.ReactElement {
        const {img,title} = this.props;
        return <div className={style.subheader} style={{background: `url(${img})`}}>
            <Container>
                <h3 className={style.subheaderTitle}>{title}</h3>
            </Container>
        </div>
    }
}
