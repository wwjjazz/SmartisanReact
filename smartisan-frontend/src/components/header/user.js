import React,{ Component } from "react";
import {  
    Link
} from "react-router-dom";
import {  
    connect
} from "react-redux";
import axios from "axios";
import {  
    logout
} from "../../actions";

class User extends Component {
    showUser(){
        if(!localStorage.getItem("uid")){
            console.log(234);
            
            return (
                <div className="nav-user-list">
                    <dl className="nav-user-avatar">
                        
                    </dl>
                    <ul>
                        <li className="order"><a href="">注册</a></li>
                        <li className="order">
                            <Link to="/login">登录</Link>
                        </li>
                    </ul>
                </div>
            )
        }else{
            console.log(345);
            
            return(
                <div className="nav-user-list">
                    <dl className="nav-user-avatar">
                        <dd><span className="ng-scope"></span></dd>
                        <dt className="ng-binding">+86 138****9453</dt>
                    </dl>
                    <ul>
                        <li className="order"><a href="">我的订单</a></li>
                        <li className="support"><a href="">售后服务</a></li>
                        <li className="coupon"><a href="">我的优惠</a></li>
                        <li className="information"><a href="">账户资料</a></li>
                        <li className="address"><a href="">收货地址</a></li>
                        <li className="logout">
                            <a onClick={this.logout.bind(this)}>退出</a>
                        </li>
                    </ul>
                </div>
            )
        }
    }
    logout(){
        axios.get("/api/user/logout").then(res => {
            console.log(123, res.data.data)
            localStorage.removeItem("uid");
            window.location.reload();
        })
    }
    render(){
        return(
            <li className="nav-user">
                <a href="">个人中心</a>
                <div className="nav-user-wrapper">
                    {this.showUser()}
                </div>
            </li>
        )
    }
}

export default connect()(User);