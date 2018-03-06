import React,{ Component} from "react";
import {  
    connect
} from "react-redux";
import "../../assets/css/login.css";
import axios from "axios";
import { 
    login
} from "../../actions"

class Login extends Component {
    login(e){
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        axios({
            method: "POST",
            url: "/api/user/login",
            data: {
                username,
                password
            }
        }).then(res => {
            if (!res.data.code) {
                localStorage.setItem("uid", res.data.data.uid)
                this.props.history.push("/");
            }
        })
        e.preventDefault();
    }
    render(){
        return(
            <div id="login">
                <div className="title">
                    <h4>使用 Smartisan ID 登录官网</h4>
                </div>
                <form className="form">
                    <ul>
                        <li>
                            <input ref="username" type="text" placeholder="手机号/邮箱" />
                        </li>
                        <li>
                            <input ref="password" type="password" placeholder="密码" />
                        </li>
                        {/* <li>
                            提示：<span style={{
                                color: this.state.code ? 'red' : 'green'
                            }}>{this.state.message}</span>
                        </li> */}
                    </ul>
                    <button
                        className="btn"
                        onClick={this.login.bind(this)}
                    >登陆</button>
                </form>
            </div>
        )
    }
}

export default connect()(Login);