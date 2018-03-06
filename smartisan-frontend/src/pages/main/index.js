import React, { Component } from "react";

import {  
    connect
} from "react-redux";

import "../../assets/css/main.css";
import Item from "../../components/item";
import { itemsUpdate } from "../../actions/index";

class Header extends Component {
    componentDidMount(){
        if (!this.props.items.length) {
            this.props.dispatch(itemsUpdate())
        }
    }
    render() {
        let items = this.props.items.filter(item=>{
            if(item.pid===0){
                item.child = this.props.items.filter(child=>{
                    return child.pid === item.id;
                })              
            }
            return item.pid === 0;  
        })
        return (
            <div id="main">
                <div className="sku-box store-content">
                    <div className="sort-option">
                        <ul className="line clear">
                            <li><a href="" className="active">综合排序</a></li>
                            <li><a href="" className="">销量排序</a></li>
                            <li><a href="" className="">价格低到高</a></li>
                            <li><a href="" className="">价格高到低</a></li>
                        </ul>
                    </div>
                    <div className="gray-box">
                        <div className="item-box">
                            {items.map(item => <Item key={item.id} data={item}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>{
    return {
        items:state.items
    }
})(Header);