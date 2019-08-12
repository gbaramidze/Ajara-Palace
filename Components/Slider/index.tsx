import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const style = require('./style.scss');

const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
];

export default class s extends React.Component {
    render(): React.ReactElement {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return <Slider {...settings} style={{ maxHeight: 300}} className={style.slider}>
            {images.map(url=>
                <div key={url}>
                    <div style={{background: `url(../../assets/images/slider/${url})`, width: '100%', display: 'block'}} className={style.slide}/>
                </div>
            )}
        </Slider>
    }
}
