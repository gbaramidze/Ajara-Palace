import * as React from "react";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import Input from "../../Components/Input";
import {useSelector, useDispatch} from "react-redux";
import Helmet from 'react-helmet';
import Cart from "../../Components/Cart";
import {faCheckCircle, faCreditCard, faMoneyBill, faSpinner} from "@fortawesome/free-solid-svg-icons";
import PaymentRadio from "../../Components/PaymentRadio";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import IsClose from "../../Components/IsClose";
const style = require("./style.scss");


const CheckOut = () => {
  const {locale, language, order, form} = useSelector(state => state);
  const [isError, setError] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [price, setPrice] = React.useState({
    oldPrice: 0,
    newPrice: 0
  });
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [isOrdering, setOrdering] = React.useState(false);
  const {newPrice} = price;
  const grandTotal = (): void => {
    let total = 0;
    order.forEach(item => {
      total = total + (item.count * item.price)
    });

    setPrice({
      oldPrice: newPrice,
      newPrice: total
    })
  };

  const {
    mobile, address, floor, flat, entrance, paymentType, comment
  } = form;

  const changeForm = (value, name) => dispatch({
    type: 'form',
    payload: {
      ...form,
      [name]: value
    }
  });

  const handleChangeRadio = (v) => dispatch({
    type: 'form',
    payload: {
      ...form,
      paymentType: v
    }
  });

  React.useEffect(() => {
    grandTotal()
  }, []);
  const onChangeOrder = () => grandTotal();

  const isValidAddress = React.useMemo(() => {
    if(address){
      return address.match(/(.*)+\s\d(.*)/g)
    }
    return true;
  }, [address]);

  const validateForm = () => {
    const isValidMobile = mobile && mobile.length === 19;
    if(mobile && address) {
      return !isValidMobile || !isValidAddress
    }
    return true;
  };

  const checkAddress = () => {
    if(address) {
      if(!isValidAddress) {
        setShow(true);
      } else {
        setShow(false)
      }
    } else {
      setShow(false)
    }
  };

  React.useEffect(() => {
    if(data && data.success) {
      dispatch({
        type: "order",
        payload: {
          order: []
        }
      });
    }
  }, [data]);

  React.useEffect(() => {
    if(!order.length && !data){
      history.push(`/${language}/`);
    }
  }, [data, order]);

  const sendForm = (e) => {
    if(!validateForm()) {
      const data = {
        ...form,
        price: newPrice,
        language,
        orders: order
      };
      setOrdering(true);
      fetch("https://ajarapalace.ge/admin/ajax/?web_form", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      }).then(res => {
        if(res.status === 200){
          setOrdering(false);
          return res.json()
        }
      }).then(setData).catch(console.error);
    }
    e.preventDefault();
  };

  return (
    <>
      <Helmet>
        <meta httpEquiv="content-language" content={language} />
        <title>Checkout</title>
      </Helmet>
      <div className={style.page}>
        {
          isOrdering ? (
            <div className={style.loader}>
              <div className={style.spinnerWr}>
                <FontAwesomeIcon icon={faSpinner} pulse={true}/>
              </div>
            </div>
          ) : null
        }
        {
          !data ? (
            <Container>
              <Row>
                <Col xs={12} lg={4} className={style.carts}>
                  <Cart
                    onChangeOrder={onChangeOrder}
                    disableClear={true}
                  />
                  <div className={style.checkOutTotal}>
                    <div className={style.price}>
                      {locale.RESERVATION.TOTAL} {newPrice} <span className="gel">a</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} lg={8}>
                  <h2>{locale.CHECKOUT.TITLE}</h2>
                  <div className={style.checkoutForm}>
                    <Form>
                      <Form.Group>
                        <Input
                          label={locale.CHECKOUT.PHONE}
                          placeholder={"e.g: 555 121315"}
                          mask="+(\9\95) 999 99 99 99"
                          maskChar=" "
                          value={mobile}
                          type="number"
                          onChange={(e) => changeForm(e.currentTarget.value, 'mobile')}
                        />
                      </Form.Group>
                      <Form.Group>
                        <OverlayTrigger show={show} placement="bottom" overlay={
                          <Tooltip id={`tooltip`}>
                            {locale.CHECKOUT.INVALID_ADDRESS}
                          </Tooltip>
                        }>
                          <Input
                            label={locale.CHECKOUT.ADDRESS}
                            value={address}
                            onChange={(e) => changeForm(e.currentTarget.value, 'address')}
                            onBlur={checkAddress}
                            error={show}
                          />
                        </OverlayTrigger>
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} xs={6} md={4}>
                          <Input
                            label={locale.CHECKOUT.ENTRANCE}
                            mask={"99"}
                            maskChar=" "
                            value={entrance}
                            onChange={(e) => changeForm(e.currentTarget.value, 'entrance')}
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} md={4}>
                          <Input
                            label={locale.CHECKOUT.FLOOR}
                            mask={"99"}
                            maskChar=" "
                            value={floor}
                            onChange={(e) => changeForm(e.currentTarget.value, 'floor')}
                          />
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={4}>
                          <Input
                            label={locale.CHECKOUT.FLAT}
                            mask={"9999"}
                            maskChar=" "
                            value={flat}
                            onChange={(e) => changeForm(e.currentTarget.value, 'flat')}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group>
                        <Input
                          label={locale.CHECKOUT.COMMENT}
                          type={"textarea"}
                          rows={3}
                          placeholder={locale.CHECKOUT.COMMENT_DESCRIPTION}
                          value={comment}
                          onChange={(e) => changeForm(e.currentTarget.value, 'comment')}
                        />
                      </Form.Group>
                      <Form.Group>
                        <h5>{locale.CHECKOUT.PAYMENT_TYPE}</h5>
                        {locale.CHECKOUT.PAYMENT_DESCRIPTION}
                        <PaymentRadio
                          options={[
                            {
                              icon: faMoneyBill,
                              label: locale.CHECKOUT.PAYMENT_CASH
                            },
                            {
                              icon: faCreditCard,
                              label: locale.CHECKOUT.PAYMENT_CARD,
                              disabled: locale.CHECKOUT.PAYMENT_DISABLED
                            },
                          ]}
                          selected={paymentType}
                          onChange={handleChangeRadio}
                        />
                      </Form.Group>
                      <hr />
                      {
                        !isError && (
                          <Button variant="dark" size={"lg"} type="submit" className={style.checkoutButton} disabled={validateForm()} onClick={sendForm}>
                            {locale.CHECKOUT.BUTTON}
                          </Button>
                        )
                      }
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              {
                data.success && (
                  <div className={style.infoMessage}>
                    <FontAwesomeIcon icon={faCheckCircle}/>
                    <h3>{locale.CHECKOUT.SUCCESS_TITLE}</h3>
                    <div dangerouslySetInnerHTML={{__html: locale.CHECKOUT.SUCCESS_DESCRIPTION.replace('{orderID}', data.orderID)}}/>
                  </div>
                )
              }
            </Container>
          )
        }
      </div>
    </>
  )
};
export default CheckOut;
