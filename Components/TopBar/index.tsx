import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import {connect} from 'react-redux';
import {Container} from "react-bootstrap";
import iLocale from "../../Configs/locale/interface/iLocale";
const style = require('./style.scss');

const props = function(state) {
    return {
        locale: state.locale,
        language: state.language
    }
};


interface Props {
    dispatch: any,
    locale: iLocale
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
        const {
            dispatch,
            locale
        } = this.props;
        dispatch(action);
    };

    render(): React.ReactElement {
        const {maps, facebook} = this.state;
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
                                <a href='#' onClick={()=> this.changeLanguage('ru')}>ru</a>
                                <a href='#' onClick={()=> this.changeLanguage('en')}>en</a>
                                <a href='#' onClick={()=> this.changeLanguage('ka')}>ka</a>
                                <a href={facebook} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faFacebookF} title={"facebook"} className={style.facebook}/>
                                </a>
                                <a href={maps} target="_blank" rel="noreferrer noopener">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} title={"view on Google maps"}
                                                     className={style.maps}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(props)(TopBar);
