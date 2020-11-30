import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faGlobe, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import {Container, Dropdown} from "react-bootstrap";
import {useHistory, useLocation} from "react-router-dom";
const style = require('./style.scss');

const TopBar = () =>  {
    const state = {
        maps: 'https://www.google.com/maps/place/Ajara+Palace/@41.6401345,41.6282057,15z/data=!4m2!3m1!1s0x0:0xd6b38e6c74e29a87?sa=X&ved=2ahUKEwjkz8qH0o7jAhWBw8QBHWSVAR8Q_BIwC3oECA0QCA',
        facebook: 'https://www.facebook.com/ajarapalace/'
    };
    const dispatch = useDispatch();
    const {
        language, locale
    } = useSelector(state => state);
    const history = useHistory();
    const location = useLocation();

    const changeLanguage = lang => {
        const action = {
            type: 'changeLanguage',
            payload: {
                language: lang
            }
        };
        history.push(location.pathname.replace(/\/(\w{2})\//, `/${lang}/`));
        dispatch(action);
    };
    const { maps, facebook } = state;
    React.useEffect(() => {
        if(location && location.pathname) {
            const match = location.pathname.match(/\/(\w{2})\//);
            if(match) {
                const [, addressLanguage] = match;
                if(addressLanguage !== language) {
                    dispatch({
                        type: 'changeLanguage',
                        payload: {
                            language: addressLanguage
                        }
                    })
                }
            }

        }
    }, [location]);
    return (
        <div className={style.wrapper}>
            <Container>
                <div className={style.topBar}>
                    <ul className={style.list}>
                        <li><FontAwesomeIcon icon={faClock}/> 09:00 / 24:00</li>
                        <li><FontAwesomeIcon icon={faPhone}/> {locale.RESTAURANT.PHONE_NUMBER}</li>
                        <li>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {locale.RESTAURANT.ADDRESS}
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
                                        <img src={`../../assets/images/flags/${language}.png`} alt={"selected language"}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={style.languageSelector}>
                                    <Dropdown.Item onClick={()=> changeLanguage('ka')} className={language === 'ka' ? 'active' : ''}>
                                        <img src={"../../assets/images/flags/ka.png"} alt={"Georgian"}/> ქართული
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={()=> changeLanguage('ru')} className={language === 'ru' ? 'active' : ''}>
                                        <img src={"../../assets/images/flags/ru.png"} alt={"Russian"} /> Русский
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={()=> changeLanguage('en')} className={language === 'en' ? 'active' : ''}>
                                        <img src={"../../assets/images/flags/en.png"} alt={"English"} /> English
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
};

export default TopBar;
