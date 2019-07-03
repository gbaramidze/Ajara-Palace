import React, { Component } from 'react';
import Slider from "./Components/Slider";
import Header from './Views/Header'

import reducer from './Configs/reducer/index.tsx';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(reducer);

class App extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Provider store={store}>
                <Header/>
                <Slider/>
            </Provider>
    )}
}
export default App;
