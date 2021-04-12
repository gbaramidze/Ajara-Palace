import React from 'react';
import Header from './Views/Header'
import {BrowserRouter as Router} from 'react-router-dom';
import reducer from './Configs/reducer/index.tsx';
import {Provider, useSelector} from 'react-redux'
import {createStore} from 'redux'
import Footer from './Views/Footer';

import Helmet from 'react-helmet';
import Routes from './Views/Routes';
import values from './Configs/values';
import $ from "jquery";

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const isProd = process.env.NODE_ENV === "production";

const App = () => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator && isProd) {
      navigator.serviceWorker.register(`${values.subFolder}service-worker.js`, {
        scope: values.subFolder,
        updateViaCache: "imports",
      });
    }
    window.jQuery = $;
  });
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8"/>
        <base href={values.subFolder}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta httpEquiv="content-language" content="ka" />
        <title>Ajara Palace</title>
      </Helmet>
      <Provider store={store}>
        <Router basename={values.subFolder}>
          <Header/>
          <div style={{flex: '1 0 auto'}} className="general-content">
            <Routes />
          </div>
          <Footer/>
        </Router>
      </Provider>
    </>
  )
};

export default App;
