import * as React from 'react'
import { Nav, Navbar, Container} from 'react-bootstrap';
import TopBar from "../../Components/TopBar";
import { connect } from 'react-redux';
import {NavLink, Link} from 'react-router-dom'
import Pace from 'react-pace-progress'

import iLocale from '../../Configs/locale/interface/iLocale';

const logo = require('../../assets/images/logo-white.png');

const style = require('./style.scss');

const mapStateToProps = function(state) {
    return {
        locale: state.locale,
        language: state.language,
        loading: state.loading
    }
};

interface Props {
    locale: iLocale,
    language: string,
    loading: boolean
}

class Header extends React.Component {
    props: Props;
    state = {
        active: '/',
        loading: false,
    };

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactElement {
        const { locale, language, loading } = this.props;
        const navigation = [
            {
                name: locale.NAVIGATION.HOME,
                url: "/",
            },
            {
                name: locale.NAVIGATION.MENU,
                url: "/menu",
            },
            {
                name: locale.NAVIGATION.GALLERY,
                url: "/gallery",
            },
            {
                name: locale.NAVIGATION.RESERVATION,
                url: "/reservation",
            },
            {
                name: locale.NAVIGATION.HOTEL,
                url: "/hotel",
            },
            {
                name: locale.NAVIGATION.CONTACT,
                url: "/contact",
            }
        ];
        return (
            <>
                { loading && <Pace color="#800000" height={4}/> }
                <TopBar />
                <Navbar variant='dark' className={`sticky-top ${style.navBar}`} collapseOnSelect expand="lg">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" >
                                <img src={logo} alt='Ajara Palace - Logo' />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end ">
                            <Nav className={(language === 'ka' ? style.georgian : style.navigation)}>
                                {Object.values(navigation).map(
                                    item =>
                                        <Nav.Item key={item.url}>
                                            <NavLink exact to={item.url}>
                                                {item.name}
                                            </NavLink>
                                        </Nav.Item>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default connect(mapStateToProps)(Header);
