import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import Counter from "../Counter";
import {Meal} from "../MenuPicker";

const style = require("./style.scss");
interface ICart {
  onClose?: () => void;
  onChangeOrder?: (id) => void;
  ordersRef?: React.MutableRefObject<any>
  highlightRef?: React.MutableRefObject<any>,
  lastEdit?: number;
  disableClear?:boolean;
}
const Cart = ({
  onClose,
  ordersRef,
  onChangeOrder,
  highlightRef  ,
  lastEdit,
    disableClear
}: ICart) => {
  const {order, locale, language} = useSelector(state=>state);
  const dispatch = useDispatch();
  const [showTrash, setShowTrash] = React.useState(false);


  const toggleTrash = (): void => setShowTrash(!showTrash);
  const clearCart = (): void => {
    dispatch({
      type: "order",
      payload: {
        order: []
      }
    });
    setShowTrash(!showTrash)
  };

  const getCount = (id: number) => {
    let count = 1;
    if (order) {
      order.forEach(item => {
        if (item.id === id) {
          count = item.count + 1
        }
      })
    }
    return count;
  };

  const setOrder = (meal: Meal, type: string = 'increase', callBack = 0) => {
    const count = getCount(meal.id);
    let push = true;
    order.forEach((item, index) => {
      if (item.id === meal.id) {
        push = false;
        item.count = type === 'increase' ? item.count + 1 : item.count - 1;
        if (!item.count) {
          order.splice(index, 1)
        }
      }
    });
    if (push) {
      order.push({
        name: meal.name,
        name_ru: meal.name_ru,
        name_en: meal.name_en,
        price: meal.price,
        total: parseInt(meal.price) * count,
        count: count,
        thumb: meal.thumb,
        id: meal.id
      });
    }
    dispatch({
      type: 'order',
      payload: {
        order: order.concat(),
      }
    });

    if(onChangeOrder && typeof onChangeOrder === "function") {
      onChangeOrder(meal.id)
    }
  };

  const addToOrder = (meal, type, callback) => {
    if(setOrder && typeof setOrder === "function") {
      setOrder(meal, type, callback)
    }
  };

  return (
    <>
      <ul className={style.orders} ref={ordersRef || null}>
        <li className={style.cartHeader}><h3>{locale.RESERVATION.MY_ORDER}</h3>
          {
            order.length ? (
              <>
                {
                  !disableClear && <Button variant={"light"} onClick={toggleTrash}><FontAwesomeIcon icon={faTrash}/></Button>
                }
                <Modal
                  show={showTrash}
                  onHide={toggleTrash}
                  keyboard={false}
                  centered={true}
                  animation={false}
                >
                  <Modal.Header>
                    <Modal.Title translate={language}>{locale.RESERVATION.TRASH.HEADER}</Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button variant="primary" onClick={clearCart}>{locale.RESERVATION.TRASH.CLEAR}</Button>
                    <Button variant="secondary" onClick={toggleTrash} className={style.trash}>
                      {locale.RESERVATION.TRASH.CANCEL}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : null
          }
        </li>
        {
          order.map((item: Meal) => {
            const name = language === 'ka' ? item.name : item[`name_${language}`];
            return (
              <li className={`${style.orderList}`} key={item.id} title={item.name}>
                <div className={style.orderTitle}>
                  <img src={`${item.thumb}&w=350`} className={`${style.orderImg}`} alt={item[name]}/>
                  {name}
                </div>
                <div className={`${style.orderCount} ${lastEdit === item.id ? style.highlight : ''}`}
                     ref={highlightRef || null}>
                  <Counter increment={() => addToOrder(item, 'increase', 1)}
                           decrement={() => addToOrder(item, 'decrease', 1)}>
                    {item.count}
                  </Counter>
                </div>
                <div className={`${style.orderPrice} ${lastEdit === item.id ? style.highlight : ''}`}
                     ref={highlightRef}>
                  {item.price} <span className="gel">a</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </>
  )
};

export default React.memo(Cart);
