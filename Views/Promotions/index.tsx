import * as React from 'react';
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import LazyLoad from 'react-lazyload';
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
//
const style = require("./style.scss");
const Promotions = () => {
  const {locale} = useSelector(state=>state);
  const images = [
    {
      column: [1,2,3,4]
    },
    {
      column: [5,6,7,8]
    },
    {
      column: [9,10,11,12]
    },
    {
      column: [13,14,15,16]
    },
    {
      column: [17,18,19,20]
    },
  ];
  const Images = () => {
    return (
      <>
        {
          images.map(({column}, index) => {
            return (
              <div className={style.column} key={`column.${index}`}>
                {
                  column.map(elem => {
                    const url = `/assets/images/promotions/${elem}.jpg`;
                    return (
                        <div className={style.imageWrapper}  key={`img.${elem}`}>
                          <LazyLoad height={200} debounce={100} once>
                            <LightgalleryItem src={url} group="1">
                              <img src={url} alt={`Promotion ${elem}`} className={style.image}/>
                            </LightgalleryItem>
                          </LazyLoad>
                        </div>
                      );
                  })
                }
              </div>
            )
          })
        }
      </>
    )
  };

  return (
    <Container>
      <div className="header">
        <h1>{locale.PROMOTION.TITLE}</h1>
        <p>{locale.PROMOTION.DESCRIPTION}</p>
      </div>
      <div className={style.row}>
        <LightgalleryProvider>
          <Images />
        </LightgalleryProvider>
      </div>
    </Container>
  )
};

export default Promotions;
