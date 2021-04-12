import * as React from 'react';
import Home from "../Home";
import CheckOut from "../CheckOut";
import {Redirect, Route, Switch } from 'react-router-dom';
import Contact from "../Contact";
import Promotions from "../Promotions";


const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/:lang/" component={Home}/>
        <Route path="/:lang/checkout" component={CheckOut}/>
        <Route path="/:lang/promotions" component={Promotions}/>
        <Route path="/:lang/contact" component={Contact}/>
        <Redirect to="/ka/"/>
      </Switch>
    </>
  )
};
export default Routes;
