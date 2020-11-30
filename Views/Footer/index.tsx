import * as React from 'react'
import Social from "../../Components/Social";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
const style = require("./style.scss");

const Footer = () => {
    const {locale, language} = useSelector(state=>state);
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
          <footer className={`${style.footerDistributed} ${(language === 'ka' ? style.georgian : '')}`}>
              <div className="footer-right">
                  <Social icon={faInstagram} url="https://www.instagram.com/ajara_palace/" />
                  <Social icon={faFacebook} url="https://www.facebook.com/ajarapalace/" />
                  <Social icon={faMapMarker} url="https://www.google.com/maps/place/Ajara+Palace+%E2%80%A2+%E1%83%90%E1%83%AD%E1%83%90%E1%83%A0%E1%83%90+%E1%83%9E%E1%83%90%E1%83%9A%E1%83%90%E1%83%A1%E1%83%98/@41.6401345,41.6282057,15z/data=!4m5!3m4!1s0x0:0xd6b38e6c74e29a87!8m2!3d41.6401381!4d41.6282111" />
              </div>
              <div className="footer-left">
                  <p className="footer-links">
                      {Object.values(navigation).map((item, index) =>
                          <Link to={item.url} key={`navItem.${index}`}>
                              {item.name}
                          </Link>
                      )}
                  </p>
                  <p className={style.author} dangerouslySetInnerHTML={{__html: locale.AUTHOR}}/>
              </div>
          </footer>
      </>
    )
};

export default Footer;
