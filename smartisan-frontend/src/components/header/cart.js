import React,{ Component } from "react";
import {  
    connect
} from "react-redux";
import {  
    cartsUpdate
} from "../../actions";

class Cart extends Component {
    del(id){
        if(!localStorage.getItem("uid")){
            let data = JSON.parse(localStorage.getItem("carts")).filter(item=>{
                return item.id!==id;
            });
            localStorage.setItem("carts", JSON.stringify(data));
            this.props.dispatch(cartsUpdate(data));
        }
    }
    showItem(){
        return(
            <ul>
                {this.props.carts.map(good=>{
                    let goodInfo = this.props.items.find(item=>{
                        return item.id === good.id
                    })
                    if(goodInfo){
                        goodInfo.title = this.props.items.find(item => { 
                            return item.id == goodInfo.pid 
                        }).title;
                    }
                    console.log(goodInfo)
                    return(
                        <li key={good.id} className="clear">
                            <div className="cart-item js-cart-item cart-item-sell">
                                <div className="cart-item-inner">
                                    <div className="item-thumb">
                                        <img src={goodInfo && goodInfo.cover} alt=" " />
                                    </div>
                                    <div className="item-desc">
                                        <div className="cart-cell">
                                            <h4>
                                                <a href="">{goodInfo&&goodInfo.title}</a>
                                            </h4>
                                            <p className="attrs">
                                                <span>{goodInfo && goodInfo.name}</span>
                                            </p>
                                            <h6>
                                                <span className="price-icon">¥</span>
                                                <span className="price-num">{goodInfo &&(goodInfo.price/100).toFixed(2)} </span>
                                                <span className="item-num">x {good.nub}</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div 
                                        className="del-btn"
                                        onClick = {this.del.bind(this,good.id)}
                                    >删除</div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    }
    showCart(){
        if(this.props.carts.length){
            return(
                <div className="full">
                    <div className="nav-cart-items">
                        {this.showItem()}
                    </div>
                    <div className="nav-cart-total">
                        <p>共 <strong className="ng-binding">1</strong> 件商品</p>
                        <h5>合计：<span className="price-icon">¥</span><span className="price-num ng-binding">49</span></h5>
                        <h6>
                            <a className="nav-cart-btn">去购物车</a>
                        </h6>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="empty">
                    <h3>购物车为空</h3>
                    <p>您还没有选购任何商品，现在前往商城选购吧!</p>
                </div>
            )
        }
    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("carts"))||[];
        this.props.dispatch(cartsUpdate(data));
    }
    render(){
        console.log(this.props.carts)
        let totleNub = this.props.carts.reduce((prev,item)=>{
            return prev + item.nub;
        },0);
        let totlePrice = this.props.carts.reduce((prev, item) => {
            return prev + item.nub;
        }, 0);
        console.log(totleNub,totlePrice)
        return(
            <li className="nav-cart">
                <a href="">购物车</a>
                <span className="cart-empty-num cart-num">
                    <i>{totleNub}</i>
                </span>
                <div className="nav-cart-wrapper">
                    <div className="nav-cart-list">
                        {this.showCart()}
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(state=>{
    return {
        carts: state.carts,
        items: state.items
    }
})(Cart);