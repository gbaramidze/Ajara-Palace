import * as React from 'react'
import { Nav, Navbar, Container} from 'react-bootstrap';
import TopBar from "../../Components/TopBar";
import { connect } from 'react-redux';

import iLocale from '../../Configs/locale/interface/iLocale';

const style = require('./style.scss');

const mapStateToProps = function(state) {
    return {
        locale: state.locale,
        language: state.language
    }
};

interface Props {
    locale: iLocale,
}

class Header extends React.Component {
    props: Props;
    constructor(props: Props) {
        super(props);
        this.props = props;
    }

    render(): React.ReactElement {
        const { locale } = this.props;
        return (
            <>
                <TopBar />
                <Navbar variant='dark' className={`sticky-top ${style.navBar}`}>
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src='./assets/images/logo-white.png' alt='Ajara Palace - Logo' />
                        </Navbar.Brand>
                        <Nav className="justify-content-end">
                            <Nav.Link href="/">{locale.NAVIGATION.HOME}</Nav.Link>
                            <Nav.Link href="/menu">{locale.NAVIGATION.MENU}</Nav.Link>
                            <Nav.Link href="/gallery">{locale.NAVIGATION.GALLERY}</Nav.Link>
                            <Nav.Link href="/reservation">{locale.NAVIGATION.RESERVATION}</Nav.Link>
                            <Nav.Link href="/hotel">{locale.NAVIGATION.HOTEL}</Nav.Link>
                            <Nav.Link href="/contacts">{locale.NAVIGATION.CONTACT}</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default connect(mapStateToProps)(Header);
