import * as React from 'react';
import {connect} from "react-redux";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {faChevronLeft, faChevronRight, faShoppingCart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CountUp from 'react-countup';
import Button from "react-bootstrap/Button";
import Counter from "../Counter";
import Scrollspy from 'react-scrollspy'
import Slider from "react-slick";

const style = require("./style.scss");


interface Category {
   id: number,
   name: string,
   name_en: string,
   name_ru: string
   type: string
   items: Meal[]
}

interface Meal {
    id: number,
    name: string,
    name_en: string,
    name_ru: string
    price: string
    thumb: string
    need: string[]
    count: number
    total: number
}

class MenuPicker extends React.Component {
    delay;
    props;
    timeout;
    state = {
        selectedCategory: 0,
        oldPrice: 0,
        newPrice: 0,
        lastEdit: null,
        showMobile: false,
        stuck: 0,
        slideIndex: 0,
        isScrolling: false,
        unScroll: false,
    };
    constructor(props){
        super(props);
        this.props = props;
        this.handleScroll = this.handleScroll.bind(this);
    }
    kitchen(): any[] {
        const { data } = this.props;
        return Object.values(data).filter((item: Category)=> item.type === 'restourant' && item.id <= 73 && item.items.length)
    }

    bar(): any[] {
        const { data } = this.props;
        return Object.values(data).filter((item: Category)=> item.type === 'bar' && item.id <= 73 && item.items.length)
    }


    public componentDidMount(): void {
        // window.addEventListener('scroll', this.handleScroll);
         this.handleScroll();
    }

    private handleScroll() : void {
        if(this.delay) clearTimeout(this.delay);
        this.delay = setTimeout(() => {

            this.setState({
                // @ts-ignore
                stuck: window.outerHeight - 205 - document.querySelector('.cart').getBoundingClientRect().top
            })
        }, 100)
    }

    private getCount(id: number): number {
        const { order } = this.props;
        let count = 1;
        if(order) {
            order.forEach(item=> {
                if(item.id === id) {
                    count = item.count + 1
                }
            })
        }
        return count;
    }

    public inOrder(id:number): boolean {
        const { order } = this.props;
        let ret = false;
        if(order) {
            order.forEach(item=> {
                if(item.id === id) {
                    ret = true
                }
            })
        }
        return ret
    }

    public countOrder(id:number): number {
        const {order} = this.props;
        let ret = 0;
        if (order) {
            order.forEach(item => {
                if (item.id === id) {
                    ret = item.count;
                }
            })
        }
        return ret
    }


    public setOrder(meal: Meal, type: string = 'increase', callBack = 0) {
        const { dispatch, order } = this.props;
        const count = this.getCount(meal.id);
        let push = true;
        order.forEach((item,index)=> {
            if(item.id === meal.id) {
                push = false;
                item.count = type === 'increase' ? item.count + 1 : item.count - 1;
                if (!item.count) {
                    order.splice(index,1)
                }
            }
        });
        if(push) {
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

        if(callBack !== 1) {
            this.setState({
                lastEdit: meal.id
            },()=>{
                const elem = document.querySelector('.highlight');
                // @ts-ignore
                document.querySelector('.orders').scrollTop = elem.offsetTop - 100;
                if(this.timeout) { clearTimeout(this.timeout) }
                this.timeout = setTimeout(()=>{
                    this.setState({
                        lastEdit: null
                    })
                },500)
            });
        }
        this.grandTotal();
    }

    private grandTotal(): void {
        const { order} = this.props;
        const { newPrice } = this.state;
        let total = 0;
        order.forEach(item=> {
            total = total + (item.count * item.price)
        });

        this.setState({
            oldPrice: newPrice,
            newPrice: total
        })
    }

    slider: Slider;

    private navigateTo(elem: React.ReactElement): void {
        const { slideIndex, isScrolling } = this.state;
        const index = Array.prototype.slice.call(document.querySelector('.MenuList').children).indexOf(elem);
        if(index > -1 && slideIndex !== index && !isScrolling) {
            this.setState({
                slideIndex: index
            },()=> {
                this.slider.slickGoTo(index)
                this.setState({
                    unScroll: true
                })
            })
        }

    }

    private getElementY(query) {
        return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
    }

    doScrolling(e) {
        e.preventDefault();
    }


    startScroll(e, duration = 300) {
        const { isScrolling, unScroll } = this.state;
        const element = encodeURI(e.querySelector('a').getAttribute('to'));
        let change = this.getElementY(element) - 150;

        if(!unScroll) {
            if(!isScrolling) {
                this.setState({
                    isScrolling: true
                });
                scrollTo({
                    top: change,
                    behavior: 'smooth'
                });

                window.onscroll = () => {
                    let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop;
                    // Scroll reach the target
                    if (currentScrollOffset === change) {
                        this.setState({
                            isScrolling: false
                        })
                    }
                }
            }
        }
        this.setState({
            unScroll: false
        })
    }



    static easeInOutQuad(t, b, c, d): number {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    public catName(str: string): string {
        return encodeURI(str.split(" ").join('-').toLowerCase())
    }

    public render(): React.ReactElement {
        const { oldPrice, newPrice, lastEdit, showMobile,stuck}=this.state;
        const {language,order, locale} = this.props;
        const kitchen = this.kitchen();
        const bar = this.bar();
        const categories = [
            "კერძები",
            "სასმელები"
        ];
        const data = {
            [categories[0]]: kitchen,
            [categories[1]]: bar
        };

        const onlyCategories = []

        Object.values(data).forEach((tt) =>  {
            tt.forEach((item:Category)=> {
                onlyCategories.push(this.catName(item.name_en))
            })
        });



        const SlickArrowLeft = ({ currentSlide, slideCount, ...props }): React.ReactElement => (
            <span
                {...props}
                className={
                    "btn btn-sm btn-light slick-arrow slick-prev" +
                    (currentSlide === 0 ? " disabled" : "")
                }
                aria-hidden="true"
                aria-disabled={currentSlide === 0}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </span>
        );

        const SlickArrowRight = ({ currentSlide, slideCount, ...props }): React.ReactElement => (
            <span
                {...props}
                className={
                    "btn btn-sm btn-light slick-arrow slick-next" +
                    (currentSlide === slideCount ? " disabled" : "")
                }
                aria-hidden="true"
                aria-disabled={currentSlide === slideCount}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </span>
        );


        const settings = {
            className: "active",
            dots: false,
            infinite: false,
            speed: 600,
            swipeToSlide: true,
            focusOnSelect: true,
            variableWidth: true,
            nextArrow: <SlickArrowRight/>,
            prevArrow: <SlickArrowLeft/>,
            afterChange: ()=> {
                this.startScroll(document.querySelector('.slick-active'));

            }
        };
        return <>
            <Tab.Container>
                <div className={style.stickyNav}>
                        <Nav variant="pills" className={`${style.cats} mr-auto `}>
                            <div className={style.topCats}>
                                {categories.map((category)=>
                                    <Nav.Item key={category}>
                                        <Nav.Link
                                            onClick={()=> document.activeElement.scrollIntoView({block: 'end', inline: 'center'})}
                                        >
                                            {category}
                                        </Nav.Link>
                                    </Nav.Item>
                                )}
                            </div>
                            <div className={style.toggleMobile} onClick={()=> this.setState({ showMobile: true })}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                ({order.length})
                            </div>
                            <Nav.Item className={style.sliderWrapper}>
                                    <Slider {...settings} ref={slider => (this.slider = slider)}>
                                        {
                                            categories.map((category)=> {
                                                return Object.values(data[category]).map((item)=> {
                                                    const name = language === 'ka' ? item.name : item[`name_${language}`] || item.name;
                                                    return  <Scrollspy offset={window.innerHeight - 160} items={[this.catName(item.name_en)]} currentClassName="active" onUpdate={(e)=> this.navigateTo(e)}>
                                                    <Nav.Link href={`#${this.catName(item.name_en)}`} to={`#${this.catName(item.name_en)}`} onClick={(e)=> this.doScrolling(e)}>{name.trim()}</Nav.Link>
                                                    </Scrollspy>
                                                })
                                            })
                                        }
                                    </Slider>
                            </Nav.Item>
                        </Nav>
                </div>

                    <Row>
                        <Col lg={9} xs={12}>
                            <div  className={style.MenuList}>
                                {categories.map((category,indexs)=>
                                    <React.Fragment key={`root-${indexs}`}>
                                        {
                                            Object.values(data[category]).map((meals: Category, indexsub) => {
                                                    const name = language === 'ka' ? meals.name : meals[`name_${language}`] || meals.name;
                                                    return <div id={this.catName(meals.name_en)}
                                                                style={{width: '100%'}}
                                                                key={`subcat-${indexsub}`}>
                                                        <h5>{name}</h5>
                                                        <Row>
                                                            {
                                                                Object.values(meals.items).map((item: Meal) => {
                                                                    const count = this.countOrder(item.id);
                                                                    const name = language === 'ka' ? item.name : item[`name_${language}`] || item.name;
                                                                    return <Col sm={6} xs={12} lg={6} key={`col-${item.id}`}
                                                                                onClick={() => this.setOrder(item)}
                                                                                className={`${this.inOrder(item.id) ? style.inOrder : ''} ${style.productItem}`}>
                                                                        <div
                                                                            className={style.product}>
                                                                            <header className={style.productHeader}>
                                                                                <div className={style.content}>
                                                                                    {name.trim()}
                                                                                </div>
                                                                                <div className={style.productPrice}>
                                                                                    {count > 0 && (
                                                                                        <span>{count} x </span>)}{item.price} ₾
                                                                                </div>
                                                                            </header>
                                                                            <div className={style.thumbWrapper}>
                                                                                <div className={style.thumb}
                                                                                     style={{background: `url(${item.thumb})`}}/>
                                                                            </div>
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
                        <div className={`${style.order} ${showMobile ? style.open : style.hide}`} >
                            <div className={style.cart} style={{height: `${stuck}px`}}>
                                <div className={style.mobileClose} onClick={()=> this.setState({ showMobile: false })}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>

                                <ul className={style.orders}>
                                    <li><h3>{locale.RESERVATION.MY_ORDER}</h3></li>
                                    {
                                        order.map((item: Meal)=> {
                                            const name = language === 'ka' ? item.name : item[`name_${language}`];
                                            return (
                                                <li className={`${style.orderList}`} key={item.id} title={item.name}>
                                                    <div className={style.orderTitle}>
                                                        <img src={item.thumb} className={`${style.orderImg}`} alt={item[name]}/>
                                                        {name}
                                                    </div>
                                                    <div className={`${style.orderCount} ${lastEdit === item.id ? style.highlight : ''}`}>
                                                        <Counter increment={()=> this.setOrder(item,'increase', 1)}
                                                                 decrement={()=> this.setOrder(item,'decrease', 1)}>
                                                            {item.count}
                                                        </Counter>
                                                    </div>
                                                    <div className={`${style.orderPrice} ${lastEdit === item.id ? style.highlight : ''}`}>
                                                        {item.price} ₾
                                                    </div>
                                                </li>
                                            )})
                                    }
                                    <li className={style.fee}>
                                        {locale.RESERVATION.FEE} {(newPrice * 10 / 100).toFixed(2)} ₾
                                    </li>
                                </ul>


                            </div>

                            <div className={style.total}>
                                <div className={style.totalMessage}>
                                    {locale.RESERVATION.TOTAL}
                                </div>
                                <CountUp
                                    start={oldPrice * 1.1}
                                    end={newPrice * 1.1}
                                    duration={2.75}
                                    separator=" "
                                    decimals={2}
                                    decimal=","
                                    suffix=" ₾"
                                    className={style.totalNumber}
                                />
                            </div>
                            <div className={style.btns}>
                                <Button type={"button"} variant={"danger"} block className={style.orderBtn} size='lg'>
                                    <FontAwesomeIcon icon={faShoppingCart} /> {locale.RESERVATION.ORDER_BUTTON}
                                </Button>
                            </div>
                        </div>
                    </Col>
                    </Row>

            </Tab.Container>
        </>
    }
}

const props = function(state) {
    return {
        language: state.language,
        locale: state.locale,
        order: state.order
    }
};

export default connect(props)(MenuPicker);
