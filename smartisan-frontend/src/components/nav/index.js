import React, { Component } from "react";

class Nav extends Component {
    render() {
        return (
            <ul className="nav-list">
                {this.props.data.map((li,index)=>{
                    return (
                        <li key={index}><a href="">{li}</a></li>
                    )
                })}
            </ul>
        )
    }
}

export default Nav;