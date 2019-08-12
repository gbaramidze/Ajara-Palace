import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faGlobe, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {connect} from 'react-redux';
import {Container, Dropdown} from "react-bootstrap";
import iLocale from "../../Configs/locale/interface/iLocale";
const style = require('./style.scss');

const props = function(state) {
    return {
        locale: state.locale,
        language: state.language,
    }
};


interface Props {
    dispatch: any,
    locale: iLocale,
    language: string,
}


class TopBar extends React.Component {
    props: Props;

    state = {
        maps: 'https://www.google.com/maps/place/Ajara+Palace/@41.6401345,41.6282057,15z/data=!4m2!3m1!1s0x0:0xd6b38e6c74e29a87?sa=X&ved=2ahUKEwjkz8qH0o7jAhWBw8QBHWSVAR8Q_BIwC3oECA0QCA',
        facebook: 'https://www.facebook.com/ajarapalace/'
    };

    changeLanguage = lang => {
        const action = {
            type: 'changeLanguage',
            payload: {
                language: lang
            }
        };
        const {dispatch} = this.props;
        dispatch(action);
    };

    render(): React.ReactElement {
        const { maps, facebook } = this.state;
        const { language } = this.props;
        return (
            <div className={style.wrapper}>
                <Container>
                    <div className={style.topBar}>
                        <ul className={style.list}>
                            <li><FontAwesomeIcon icon={faClock}/> 09:00 / 24:00</li>
                            <li><FontAwesomeIcon icon={faPhone}/> +(995) 577 777975</li>
                            <li>
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                Georgia, Batumi, Pushkini str 136 b
                            </li>
                        </ul>
                        <ul className={`justify-content-end ${style.social}`}>
                            <li>
                                <a href={facebook} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faFacebookF} title={"facebook"} className={style.facebook}/>
                                </a>
                            </li>
                            <li>
                                <a href={maps} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} title={"view on Google maps"}
                                                     className={style.maps}/>
                                </a>
                            </li>
                            <li>
                                <Dropdown alignRight>
                                    <Dropdown.Toggle as="a" id="dropdown-basic" varian="success">
                                        <FontAwesomeIcon icon={faGlobe} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className={style.languageSelector}>
                                        <Dropdown.Item onClick={()=> this.changeLanguage('ka')} className={language === 'ka' ? 'active' : ''}>ქართული</Dropdown.Item>
                                        <Dropdown.Item onClick={()=> this.changeLanguage('ru')} className={language === 'ru' ? 'active' : ''}>Русский</Dropdown.Item>
                                        <Dropdown.Item onClick={()=> this.changeLanguage('en')} className={language === 'en' ? 'active' : ''}>English</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(props)(TopBar);
