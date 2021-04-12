import * as React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap';
import TopBar from "../../Components/TopBar";
import {NavLink, Link} from 'react-router-dom'
import Pace from 'react-pace-progress'
import {useSelector, useDispatch} from "react-redux";
import logo from "../../assets/images/logo-white.png";

const style = require('./style.scss');

const Header = () => {
  const {locale, language, loading, sidebar} = useSelector(state=>state);
  const dispatch = useDispatch();
  const navigation = [
    {
      name: locale.NAVIGATION.HOME,
      url: `/${language}/`,
    },
    {
      name: locale.NAVIGATION.GALLERY,
      url: `/${language}/promotions`,
    },
    {
      name: locale.NAVIGATION.CONTACT,
      url: `/${language}/contact`,
    }
  ];



  return (
    <>
      {loading && <Pace color="#800000" height={4}/>}
      <TopBar/>
      <>
        <Navbar variant='dark' className={`${style.stickyTop} ${style.navBar} ${style.desktop}`} collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand>
              <Link to={`/${language}/`}>
                <img src={logo} alt='Ajara Palace - Logo'/>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
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
    </>
  )
};

export default Header;
