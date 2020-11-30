import * as React from "react";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";

const style = require("./style.scss");
const Welcome = () => {
  const {locale} = useSelector(state => state);
  const replace = (string: string) => {
    return string.replace("{gel}", "<span className='gel'>")
  };
  return (
    <Container className={style.welcomeContent}>
      <div className={style.welcomeWrapper}>
        <div className={style.welcomeMask} />
        <div className={style.welcomeContainer}>
          <div>
            <address>{locale.RESTAURANT.ADDRESS}</address>
            <h1>
              {
                locale.RESTAURANT.NAME
              }
            </h1>
          </div>
          <div className={style.divider} />
          <div className={style.description}>
            <div className={style.delivery}>
              <div className={style.title}>
                {locale.RESTAURANT.DELIVERY}
              </div>
              <div className={style.text} dangerouslySetInnerHTML={{__html: locale.RESTAURANT.DELIVERY_PRICE.replace('₾','<span class="gel">a</span>')}}/>
            </div>
            <div className={style.start}>
              <div className={style.title}>
               {locale.RESTAURANT.START}
              </div>
              <div className={style.text} dangerouslySetInnerHTML={{__html: locale.RESTAURANT.START_PRICE.replace('₾','<span class="gel">a</span>')}}/>
            </div>
            <div className={style.phone}>
              <div className={style.title}>
                {locale.RESTAURANT.PHONE}
              </div>
              <div className={style.text}>
                {locale.RESTAURANT.PHONE_NUMBER}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default React.memo(Welcome);
