import React, { Component } from "react";
import {
    Route
} from "react-router-dom";
import Header from "../header";
import Main from "../../pages/main";
import Payment from "../../pages/payment";
import Cart from "../../pages/cart";
import Detail from "../../pages/detail"; 
import Order from "../../pages/user/order";

class HasHeader extends Component {
    render(){
        return(
            <div>
                <Header />
                <Route path="/order" component={Order} />
                <Route path="/" exact component={Main} />
                <Route path="/payment" component={Payment} />
                <Route path="/cart" component={Cart} />
                <Route path="/detail/:id" component={Detail} />
            </div>
        )
    }
}

export default HasHeader;
