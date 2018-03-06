import React,{ Component } from "react";
import {  
    Link
} from "react-router-dom";
import {  
    cartsUpdate
} from "../../actions";
import {
    connect
} from "react-redux";

class Item extends Component{
    constructor(args){
        super(args);
        this.state = {
            index: 0
        }
    }
    showList(){
        return(
            <ul className="colors-list">
                {this.props.data.child.map((c,i)=>{
                    return (
                        <li key={c.id} onMouseOver={this.mouseOver.bind(this,i)}>
                            <a className={this.state.index===i?"active":""}>
                                <img src={c.color} alt=""/>
                            </a>
                        </li>
                    )
                })}
            </ul>
        );
    }
    mouseOver(index){
        this.setState({
            index
        })
    }
    addCarts(id){
        let dataArr = JSON.parse(localStorage.getItem("carts"));
        let data;
        if(!dataArr){
            dataArr = [];
            dataArr.push({ id, nub: 1 });
        }else{
            dataArr = JSON.parse(localStorage.getItem("carts"));
            console.log(2,dataArr)
            let isHave = dataArr.find(data=>{
                return data.id == id;
            });
            console.log(isHave);
            if(isHave){
                dataArr.map(data=>{
                    if(data==isHave){
                        data.nub+=1
                    }
                    return data;
                })
            }else{
                dataArr.push({ id, nub: 1 });
            }
        }
        this.props.dispatch(cartsUpdate(dataArr));
        data = JSON.stringify(dataArr);
        localStorage.setItem("carts",data);
    }
    render(){
        let currentItem = this.props.data.child[this.state.index];
        return(
            <div className="item">
                <div>
                    <div className="item-img">
                        <img alt={this.props.data.title} src={currentItem.cover} style={{ opacity: 1 }} />
                    </div>
                    <h6>{this.props.data.title}</h6>
                    <h3>{this.props.data.subTitle}</h3>
                    <div className="params-colors">
                        {this.showList()}
                    </div>
                    <div className="item-btns clearfix">
                        <span className="item-gray-btn">
                            <Link to={"detail/"+currentItem.id}>查看详情</Link> 
                        </span>
                        <span 
                            className="item-blue-btn"
                            onClick={this.addCarts.bind(this, currentItem.id)}
                        >加入购物车</span>
                    </div>
                    <div className="item-price clearfix">
                        <i>¥</i><span>{(currentItem.price/100).toFixed(2)}</span>
                    </div>
                    <div className="discount-icon">false</div>
                    <div className="item-cover">
                        <Link to={"detail/" + currentItem.id}></Link> 
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Item);