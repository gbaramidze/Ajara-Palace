import * as React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {faChevronRight, faShoppingCart, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CountUp from 'react-countup';
import Button from "react-bootstrap/Button";
import LazyLoad from 'react-lazyload';
import {ReactNode} from "react";
import {useHistory} from "react-router-dom"
import Flickity from "react-flickity-component";

import "flickity/css/flickity.css";
import Cart from "../Cart";

const style = require("./style.scss");


interface Category {
  id: number;
  name: string;
  name_en: string;
  name_ru: string;
  type: string;
  items: Meal[]
}

export interface Meal {
  id: number;
  name: string;
  name_en: string;
  name_ru: string;
  price: string;
  thumb: string;
  need: string[];
  count: number;
  total: number;
}

const bgs = ['a', 'b', 'c', 'd', 'e', 'f'];
let num = 0;

const MenuPicker = ({data}) => {
  let delay;

  const initialState = {
    selectedCategory: 0,
    showMobile: false,
    unScroll: false,
  };
  const history = useHistory();
  const [state, setState] = React.useState(initialState);
  const [Slider, setSlider] = React.useState(null);
  const [selectedName, setSelectedName] = React.useState(null);
  const [lastEdit, setLastEdit] = React.useState(null);
  const [price, setPrice] = React.useState({
    oldPrice: 0,
    newPrice: 0
  });
  const [cartSize, setCartSize] = React.useState(0);

  const {language, order, locale} = useSelector(state => state);
  const dispatch = useDispatch();
  const {showMobile} = state;
  const {oldPrice, newPrice} = price;
  const ordersRef = React.useRef<HTMLUListElement>();
  const highlightRef = React.useRef<HTMLDivElement>();

  const setSelect = (id) => {
    Slider.select(id);
  };


  const kitchen = (): any[] => {
    return Object.values(data).filter((item: Category) => item.type === 'restourant' && item.id <= 73 && item.items.length)
  };

  const bar = (): any[] => {
    return Object.values(data).filter((item: Category) => item.type === 'bar' && item.id <= 73 && item.items.length)
  };



  const categories = [
    "კერძები",
    "სასმელები"
  ];



  const handleScroll = () => {
    if (delay) clearTimeout(delay);
    delay = setTimeout(() => {
      setCartSize(window.innerHeight - 140 - document.querySelector('.cart').getBoundingClientRect().top)
    }, 10)
  };

  const inOrder = (id: number) => {
    let ret = false;
    if (order) {
      order.forEach(item => {
        if (item.id === id) {
          ret = true
        }
      })
    }
    return ret
  };

  const countOrder = (id: number): number => {
    let ret = 0;
    if (order) {
      order.forEach(item => {
        if (item.id === id) {
          ret = item.count;
        }
      })
    }
    return ret
  };

  const onChangeOrder = (id) => {
    grandTotal();
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    if(order) {
      grandTotal()
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [order]);

  React.useEffect(() => {
    if (lastEdit && ordersRef && highlightRef) {
      ordersRef.current.scrollTop = highlightRef.current.offsetTop - 100;
      setTimeout(()=> {
        setLastEdit(null)
      }, 400);
    }

  }, [lastEdit]);

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

  const getElementY = (selector): number => {
    return window.pageYOffset + selector.getBoundingClientRect().top
  };

  const startScroll = (e) => {
    let change = getElementY(e) - 150;
    scrollTo({
      top: change,
      behavior: 'smooth'
    });
    setTimeout(() => {
      setState({
        ...state,
        unScroll: false,
      })
    },1000)
  };

  const goto = (e): void => {
    const elem = document.querySelector(`#${encodeURI(e.target.value)}`);
    setSelectedName(e.target.value);
    startScroll(elem)
  };

  const slideTo = (name: string, e, index: number) => {
    const encodedName = catName(name);
    const elem = document.querySelector(`#${encodedName}`);
    e.preventDefault();
    setSelectedName(name);
    setSelect(index);
    startScroll(elem)
  };


  const catName = (str: string): string => {
    return encodeURI(str.split(" ").join('-').toLowerCase())
  };

  const getSpinner = (): ReactNode => {
    num++;
    if (num === bgs.length) num = 0;
    const bg = bgs[num];
    return <div className={style.menuBgWrapper}>
      <div className={`${style.menuBg} ${bg}`}/>
    </div>
  };


  const foptions = {
    freeScroll: true,
    contain: true,
    pageDots: false
  };

  const response = {
    [categories[0]]: kitchen(),
    [categories[1]]: bar()
  };


  const initSlider = slider => {
    if(!Slider) { setSlider(slider) }
  };

  const renderCategories = () => {
    const data = [];
    categories.map((category) => {
        return Object.values(response[category]).map(({name, name_en, name_ru}) => {
          let itemName;
          if (language === "ru") {
            itemName = name_ru
          } else if (language === "en") {
            itemName = name_en
          } else {
            itemName = name
          }
          data.push(({
            name: name_en,
            itemName
          }))
        })
      }
    );
    return data
  };

  React.useEffect(() => {
    if(Slider) {
      Slider.on("change", (id) => {
        const c = document.querySelectorAll(`.MenuList .menuItem`)[id];
        startScroll(c)
      });
    }
  }, [Slider]);

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
    setLastEdit(meal.id);
    grandTotal();
  };

  const toggleMobile = () => {
    if(!state.showMobile) {
      setState({...state, showMobile: true})
    } else {
      setState({...state, showMobile: false})
    }
  };

  const buttonProps = {
    disabled: false,
    block: true,
    onClick: (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0
      });
      history.push(`/${language}/checkout`);
    }
  };

  if(!order.length) {
    buttonProps.disabled = true;
  }

  return (
    <>
      {
        data && (
          <>
            <div className={style.stickyNav}>
              <div className={`${style.cats} mr-auto `}>
                <select value={selectedName ? selectedName : catName(kitchen()[0]['name_en'])} onChange={(e) => {
                  goto(e)
                }} className={style.mobileNav}>
                  {
                    kitchen().map(item => {
                      const name = language === 'ka' ? item.name : item[`name_${language}`] || item.name;
                      return <option value={catName(item.name_en)} key={item.id}>{name}</option>
                    })
                  }
                  {
                    bar().map(item => {
                      const name = language === 'ka' ? item.name : item[`name_${language}`] || item.name;
                      return <option value={catName(item.name_en)} key={item.id}>{name}</option>
                    })
                  }
                </select>
                <Flickity options={foptions} className={"slider"} flickityRef={initSlider}>
                    {
                      renderCategories().map(({name, itemName}, index) => (
                        <div
                            key={`cat-${name}`}
                            className={`${style.navElement}`}
                            onClick={(e) => slideTo(name, e, index)}
                        >
                            {
                              itemName.trim()
                            }
                          </div>
                      ))
                    }
                  </Flickity>
              </div>
            </div>

            <Row>
              <Col lg={9} xs={12}>
                <div className={style.MenuList}>
                  {categories.map((category, indexs) =>
                    <React.Fragment key={`root-${indexs}`}>
                      {
                        Object.values(response[category]).map((meals: Category, indexsub) => {
                            const name = language === 'ka' ? meals.name : meals[`name_${language}`] || meals.name;
                            return <div id={catName(meals.name_en)}
                                        style={{width: '100%'}}
                                        className={"menuItem"}
                                        key={`subcat-${indexsub}`}>
                              <h5>{name}</h5>
                              <Row>
                                {
                                  Object.values(meals.items).map((item: Meal) => {
                                    const count = countOrder(item.id);
                                    const name = language === 'ka' ? item.name : item[`name_${language}`] || item.name;
                                    return <Col sm={4} xs={6} lg={3} key={`col-${item.id}`}
                                                onClick={() => setOrder(item)}
                                                className={`${inOrder(item.id) ? style.inOrder : ''} ${style.productItem}`}>
                                      <div
                                        className={style.product}>
                                        <header className={style.productHeader}>
                                          <div className={style.content}>
                                            {name.trim()}
                                          </div>
                                          <div className={style.productPrice}>
                                            {count > 0 && (
                                              <span>{count} x </span>)}{item.price} <span className="gel">a</span>
                                          </div>
                                        </header>
                                        <div className={style.thumbWrapper}>
                                          <LazyLoad height={140} debounce={100} placeholder={getSpinner()}>
                                            <div className={style.thumb} location={`/domains/ajarapalace.ge/public_html/admin/uploads/items/${item.hash}`} style={{background: `url(${item.thumb}&h=220)`}}/>
                                          </LazyLoad>
                                        </div>
                                        <header className={style.mobileProductHeader}>
                                          <div className={style.content}>
                                            {name.trim()}
                                          </div>
                                          <div className={style.productPrice}>
                                            {count > 0 && (
                                              <span>{count} x </span>)}{item.price} <span className="gel">a</span>
                                          </div>
                                        </header>
                                      </div>
                                    </Col>
                                  })
                                }
                              </Row>
                            </div>
                          }
                        )
                      }
                    </React.Fragment>
                  )}
                </div>
              </Col>

              <Col lg={3} xs={12}>
                <div className={`${style.order} ${showMobile ? style.open : style.hide}`}>
                  <div className={style.cart} style={{height: `${cartSize}px`}}>
                    <div className={style.mobileClose} onClick={toggleMobile}>
                      <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    <Cart
                      ordersRef={ordersRef}
                      highlightRef={highlightRef}
                      onChangeOrder={onChangeOrder}
                      lastEdit={lastEdit}
                    />


                  </div>

                  <div className={style.total}>
                    <div className={style.totalMessage}>
                      {locale.RESERVATION.TOTAL}
                    </div>

                    <div>
                      <CountUp
                        start={oldPrice}
                        end={newPrice}
                        duration={2.75}
                        separator=" "
                        decimals={2}
                        decimal=","
                        className={style.totalNumber}
                      />

                      <span className="gel"> a</span>
                    </div>

                  </div>

                  <div className={style.btns}>
                    <Button
                      type={"button"}
                      variant={"dark"}
                      className={style.orderBtn}
                      size='lg'
                      {
                        ...buttonProps
                      }
                    >
                      <FontAwesomeIcon icon={faShoppingCart}/> {locale.RESERVATION.ORDER_BUTTON}
                    </Button>
                  </div>

                </div>
              </Col>

              <Col xs={12}>
                <div className={`${style.toggleMobile} ${style.total}`}
                     onClick={toggleMobile}>
                  <div className={style.totalMessage}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                  </div>

                  <div>
                    <CountUp
                      start={oldPrice}
                      end={newPrice}
                      duration={2.75}
                      separator=" "
                      decimals={2}
                      decimal=","
                      className={style.totalNumber}
                    />
                    <span className="gel"> a</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight}/>
                </div>
              </Col>
            </Row>
          </>
        )
      }
    </>
  )
};

export default React.memo(MenuPicker)
