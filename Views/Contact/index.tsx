import * as React from "react"
import {Col, Container, Row} from "react-bootstrap";
import {faClock, faEnvelope, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {useSelector} from "react-redux";
import Social from "../../Components/Social";

const style = require("./style.scss");
const Contact = () => {
  const {locale} = useSelector(state=>state);

  const Column = ({icon, text}) => (
    <div className={style.contactColumn}>
      <FontAwesomeIcon icon={icon}/> {text}
    </div>
  );



  const SocialGroup = ({children}) => (
    <div className={style.socialGroup}>
      {
        children
      }
    </div>
  );

  return (
    <Container className={style.pc}>
    <div className={style.pageWrapper}>
      <div className={style.contactPage}>
          <Row>
            <Col lg={8}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5963.444926455671!2d41.62842567667497!3d41.64013008166398!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd6b38e6c74e29a87!2zQWphcmEgUGFsYWNlIOKAoiDhg5Dhg63hg5Dhg6Dhg5Ag4YOe4YOQ4YOa4YOQ4YOh4YOY!5e0!3m2!1sru!2sru!4v1605628655300!5m2!1sru!2sru"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{border: '0'}}
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0} />
            </Col>
            <Col lg={4}>
              <div className={style.contactInfo}>
                <h3>{locale.CONTACT.TITLE}</h3>
                <Column icon={faMapMarker} text={locale.CONTACT.ADDRESS} />
                <Column icon={faPhone} text={locale.CONTACT.PHONE} />
                <Column icon={faEnvelope} text={locale.CONTACT.EMAIL} />
                <Column icon={faClock} text={locale.CONTACT.WORKING_HOURS} />
                <SocialGroup>
                  <Social icon={faInstagram} url="https://www.instagram.com/ajara_palace/" />
                  <Social icon={faFacebook} url="https://www.facebook.com/ajarapalace/" />
                  <Social icon={faMapMarker} url="https://www.google.com/maps/place/Ajara+Palace+%E2%80%A2+%E1%83%90%E1%83%AD%E1%83%90%E1%83%A0%E1%83%90+%E1%83%9E%E1%83%90%E1%83%9A%E1%83%90%E1%83%A1%E1%83%98/@41.6401345,41.6282057,15z/data=!4m5!3m4!1s0x0:0xd6b38e6c74e29a87!8m2!3d41.6401381!4d41.6282111" />
                </SocialGroup>
              </div>
            </Col>
          </Row>

      </div>
    </div>
</Container>
  )
};

export default Contact
