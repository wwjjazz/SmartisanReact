import React, { Component } from "react";
import "../../assets/css/header.css";
import User from "./user";
import Cart from "./cart";
import Nav from "../../components/nav";

class Header extends Component {
    constructor(args){
        super(args);
        this.state = {
            nav: ["在线商城", "坚果 Pro", "Smartisan M1 / M1L", "Smartisan OS", "欢喜云", "应用下载","官方论坛"],
            subNav: ["首页", "手机", "“足迹系列”手感膜", "官方配件", "周边产品", "第三方配件", "全部商品", "服务"]
        }
    }
    render() {
        return (
            <div id="header">
                <div className="nav-global">
                    <div className="container">
                        <h1 className="nav-logo">
                            <a href=""> </a>
                        </h1>
                        <ul className="nav-aside">
                            <User />
                            <Cart />
					    </ul>
                        <Nav data={this.state.nav}/>
				</div>
                    </div>
                    <div className="nav-sub">
                        <div className="nav-sub-wrapper">
                            <div className="container">
                                <Nav data={this.state.subNav}/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Header;