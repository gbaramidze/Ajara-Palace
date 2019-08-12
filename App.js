import React, { Component } from 'react';
import Slider from "./Components/Slider";
import Header from './Views/Header'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import reducer from './Configs/reducer/index.tsx';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reservation from "./Views/Reservation";
import Footer from "./Views/Footer";

const store = createStore(reducer);

class App extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Header/>
                    <div style={{flex: '1 0 auto'}}>
                        <Switch>
                            <Route exact path="/" component={Slider} />
                            <Route path="/menu" component={() => 'hello world'} />
                            <Route path="/reservation" component={Reservation} />
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </Provider>
    )}
}
export default App;
