import * as React from "react";
import Sidebar from "react-sidebar";
import * as Feather from "react-feather";
import newLogo from "../../assets/images/new.png";
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom"

const style = require("./style.scss");

const MobileNavigation = ({left, center, right}) => {
  const {sidebar, locale, language, showMobile} = useSelector(state=>state);
  const [languageSelector, setLanguageSelector] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const openSidebar = (value) => {
    dispatch({
      type: 'sidebar',
      payload: value
    })
  };

  const handleGetDirection = () => {
    window.open("https://www.google.com/maps/dir//154B,+Ajara+Palace+%E2%80%A2+%E1%83%90%E1%83%AD%E1%83%90%E1%83%A0%E1%83%90+%E1%83%9E%E1%83%90%E1%83%9A%E1%83%90%E1%83%A1%E1%83%98,+Pushkin+St,+Batumi+6010,+%D0%93%D1%80%D1%83%D0%B7%D0%B8%D1%8F/@41.6403421,41.6294238,16.96z/data=!4m16!1m6!3m5!1s0x0:0xd6b38e6c74e29a87!2zQWphcmEgUGFsYWNlIOKAoiDhg5Dhg63hg5Dhg6Dhg5Ag4YOe4YOQ4YOa4YOQ4YOh4YOY!8m2!3d41.6401385!4d41.6282111!4m8!1m0!1m5!1m1!1s0x4067860de0551c39:0xd6b38e6c74e29a87!2m2!1d41.6282111!2d41.6401381!3e3&travelmode=walking")
  };

  const callPhone = () => {
    window.open("tel:+995555198575")
  };

  const toggleMobile = () => {
    dispatch({
      type: 'showMobile',
      payload: !showMobile
    });
    openSidebar(!sidebar);
  };

  const changeLanguage = lang => {
    const action = {
      type: 'changeLanguage',
      payload: {
        language: lang
      }
    };
    history.push(location.pathname.replace(/\/(\w{2})\//, `/${lang}/`));
    dispatch(action);
    setLanguageSelector(false)
  };

  const LanguageSelector = () => {
    return (
      <div className={`${style.sidebarContent} ${style.language}`}>
        <div className={style.mask} onClick={() => setLanguageSelector(false)}/>
        <div className={style.selector}>
          <div className={`${style.sidebarContainer} ${style.second}`} onClick={() => changeLanguage('ka')}>
            <div className={style.sidebarElement}>
              <div className={style.sidebarElement_icon}><img src={require(`../../assets/images/flags/ka.png`)} /></div>
              <div>{locale.LANGUAGE.ka}</div>
              <div className={style.sidebarElement_chevron}><Feather.ChevronRight size={16} /></div>
            </div>
          </div>
          <div className={`${style.sidebarContainer} ${style.second}`} onClick={() => changeLanguage('ru')}>
            <div className={style.sidebarElement}>
              <div className={style.sidebarElement_icon}><img src={require(`../../assets/images/flags/ru.png`)} /></div>
              <div>{locale.LANGUAGE.ru}</div>
              <div className={style.sidebarElement_chevron}><Feather.ChevronRight size={16} /></div>
            </div>
          </div>
          <div className={`${style.sidebarContainer} ${style.second}`} onClick={() => changeLanguage('en')}>
            <div className={style.sidebarElement}>
              <div className={style.sidebarElement_icon}><img src={require(`../../assets/images/flags/en.png`)} /></div>
              <div>{locale.LANGUAGE.en}</div>
              <div className={style.sidebarElement_chevron}><Feather.ChevronRight size={16} /></div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  const SidebarContent = () => (
    <div className={style.sidebarContent}>
      <img src={require("../../assets/images/logo_drawer.png")} className={style.sidebarLogo}/>
      <div className={style.sidebarContainer}>
        <div className={`${style.sidebarElement} ${style.selected}`}>
          <div className={style.sidebarElement_icon}><Feather.Home size={24} /></div>
          <div>{locale.NAVIGATION.HOME}</div>
        </div>
        <div className={style.sidebarElement} onClick={toggleMobile}>
          <div className={style.sidebarElement_icon}><Feather.ShoppingBag size={24} /></div>
          <div>{locale.NAVIGATION.CART}</div>
        </div>
        <div className={style.sidebarElement}>
          <div className={style.sidebarElement_icon}><Feather.User size={24} /></div>
          <div>{locale.NAVIGATION.PROFILE}</div>
        </div>
      </div>
      <div className={`${style.sidebarContainer} ${style.second}`} onClick={() => setLanguageSelector(!languageSelector)}>
        <div className={style.sidebarElement}>
          <div className={style.sidebarElement_icon}><img src={require(`../../assets/images/flags/${language}.png`)} /></div>
          <div>{locale.PROFILE.LANGUAGE}</div>
          <div className={style.sidebarElement_chevron}><Feather.ChevronRight size={16} /></div>
        </div>
      </div>
      <div className={style.promoContainer}>
        <div className={style.promoElement} onClick={callPhone}>
          <div className={style.sidebarElement_icon}>
            <Feather.PhoneOutgoing size={18} />
          </div>
          <div>
            <div>{locale.RESTAURANT.PHONE}</div>
            <div className={style.promoDesc}>{locale.RESTAURANT.PHONE_NUMBER}</div>
          </div>
        </div>
      </div>
      <div className={style.promoContainer}>
        <div className={style.promoElement} onClick={handleGetDirection}>
          <div className={style.sidebarElement_icon}>
            <Feather.Map size={18} />
          </div>
          <div>
            <div>{locale.ABOUT.ADDRESS}</div>
            <div className={style.promoDesc}>{locale.RESTAURANT.ADDRESS}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const toggleSidebar = () => {
    dispatch({
      type: 'sidebar',
      payload: !sidebar
    })
  };

  return (
    <div className={style.onMobile}>
      {
        languageSelector && <LanguageSelector />
      }

      {
        sidebar && (
          <Sidebar
            sidebar={<SidebarContent />}
            open={sidebar}
            onSetOpen={openSidebar}
            touch={false}
            touchHandleWidth={0}
            styles={{
              sidebar: { background: "white", zIndex: 123123, width: '70%', position: 'fixed'},
              overlay: { zIndex: 2021 },
              dragHandle: { zIndex: 31 },
            }}
          >
            <>{null}</>
          </Sidebar>
        )
      }
      <div className={`${style.mNav}`}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {
            !left ? <Feather.Menu size={24} onClick={toggleSidebar}/> : left
          }
          {center && (
            <div className={style.center}>
              {center}
            </div>
          )}
        </div>
        {
          !center && (
            <Link to={`/${language}/`}>
              <img src={newLogo} alt='Ajara Palace - Logo'/>
            </Link>
          )
        }
        { right === undefined ? <Feather.Search size={24}/> :
          (
            <div className={style.right}>
              {right}
            </div>
          )
        }
      </div>
    </div>
  )
};

export default MobileNavigation
