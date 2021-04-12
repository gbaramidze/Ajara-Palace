import * as React from "react";
import TinySlider from "tiny-slider-react";
import {useSelector} from "react-redux";
import * as Feather from "react-feather";
const styles = require("./style.scss");

const Carousel = ({items, goto}) => {
  const {language} = useSelector(state=>state);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [sliderInstance, setSliderInstance] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const [localLanguage, setLocalLanguage] = React.useState(language);
  const [isMobile, setIsMobile] = React.useState(false);

  const settings = {
    nav: false,
    mode: "carousel",
    mouseDrag: true,
    loop: false,
    slideBy: 1,
    autoWidth: true,
    controls: false,
    gutter: 15,
    arrowKeys: true
  };

  const catName = (str: string): string => {
    return encodeURI(str.split(" ").join('-').toLowerCase())
  };

  const setSelect = (name, index) => {
    if(!dragging) {
      setCurrentIndex(index);
      goto(catName(name));
      if(isMobile) {
        sliderInstance.slider.goTo(index);
      }
    }
  };

  React.useEffect(() => {
    setIsMobile(window.screen.width < 768);
    if(typeof window === "object") {
      window.onresize = () => {
        setIsMobile(window.screen.width < 768);
      }
    }
  }, []);

  React.useEffect(() => {
    if(sliderInstance && typeof sliderInstance === "object" && "slider" in sliderInstance) {
      sliderInstance.slider.events.on("dragEnd", () => {
        setDragging(false);
      })
    }
  }, [sliderInstance]);

  React.useEffect(() => {
    if(localLanguage !== language) {
      setLocalLanguage(language);
      sliderInstance.slider.refresh();
    }
  }, [language]);

  const getCatName = (index) => {
    return catName(items[index].name)
  };

  const goback = () => {
    if(!!currentIndex) {
      setCurrentIndex(currentIndex - 1);
      goto(getCatName(currentIndex - 1));
      sliderInstance.slider.goTo(currentIndex - 1)
    }
  };

  const gonext = () => {
    if(currentIndex !== (items.length - 1)) {
      setCurrentIndex(currentIndex + 1);
      goto(getCatName(currentIndex + 1));
      sliderInstance.slider.goTo(currentIndex + 1);
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.controls}>
        <div className={`${styles.control} ${styles.left}`} onClick={goback}>
          <Feather.ChevronLeft size={24} color={currentIndex === 0 ? "#DDD" : "#333"}/>
        </div>
        <div className={`${styles.control} ${styles.right}`} onClick={gonext}>
          <Feather.ChevronRight size={24}  color={currentIndex === (items.length - 1) ? "#DDD" : "#333"}/>
        </div>
      </div>
      <div className={styles.imageSliderTrack}>
        <TinySlider settings={settings} startIndex={0}  ref={v => setSliderInstance(v)}>
        {items.map(({name, itemName}, index) => (
            <div
              key={`cat-${name}`}
              className={`${styles.slide} ${currentIndex === index ? styles.isSelected : ''} tns-item`}
              onClick={() => setSelect(name, index)}
            >
              {itemName.trim()}
            </div>
          ))}
        </TinySlider>
      </div>
    </div>
  )
};

export default Carousel;
