import React,{ Component } from "react";
import {  
    connect
} from "react-redux";
import {  
    Link
} from "react-router-dom";
import {  
    itemsUpdate
} from "../../actions";
import "../../assets/css/detail.css";

class Detail extends Component {
    constructor(args){
        super(args);
        this.state = {
            index: 0,
            nub: 1
        }
    }
    componentDidMount(){
        if(!this.props.items.length){
            this.props.dispatch( itemsUpdate() );
        }
    }
    componentWillReceiveProps(){
        this.setState({
            index: 0,
            nub:1
        })
    }
    change(index){
        this.setState({
            index
        })
    }
    down(){
        let nub = this.state.nub - 1;
        if(nub < 1){
            nub = 1;
        }
        this.setState({
            nub
        })
    }
    up(){
        let nub = this.state.nub + 1;
        if(nub > 10){
            nub = 10;
        }
        this.setState({
            nub
        })
    }
    render(){
        let id = Number(this.props.match.params.id);
        let item = {};
        let parent = {};
        let bros = [];
        if(this.props.items.length){
            item = this.props.items.find(item=>{
                return item.id === id;
            })
            parent = this.props.items.find(item2=>{
                return item2.id === item.pid;
            })
            bros = this.props.items.filter(item3=>{
                return item3.pid === parent.id;
            })
        }
        return(
            <div id="main">
                <div className="store-content item">
                    <div className="item-box">
                        <div className="gallery-wrapper">
                            <div className="gallery">
                                <div className="thumbnail">
                                    <ul>
                                        {item.album && item.album.map((img,index)=>{
                                            return(
                                                <li 
                                                    key={index} 
                                                    className={this.state.index===index?"on":""}
                                                    onMouseOver={this.change.bind(this,index)}
                                                >
                                                    <img 
                                                        src={img}
                                                        style={{
                                                            width:"54px",
                                                            height:"54px"
                                                        }}
                                                        alt=""
                                                    />
                                                </li>
                                            )
                                        })}
                                        
                                        
								    </ul>
							    </div>
                                <div className="thumb">
                                    <ul>
                                        <li className="on">
                                            <img
                                                src={item.album&&item.album[this.state.index]}
                                                style={{
                                                    width: "440px",
                                                    height: "440px"
                                                }}
                                                alt=""
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="banner">
                            <div className="sku-custom-title">
                                <div className="params-price">
                                    <span><em>¥</em>
                                    <i>{
                                        (item.price/100).toFixed(2)}
                                    </i></span>
                                </div>
                                <div className="params-info">
                                    <h4>{parent.title}</h4>
                                    <h6>{parent.subTitle}</h6>
                                </div>
                            </div>
                            <div className="sku-dynamic-params-panel">
                                <div className="sku-dynamic-params clear">
                                    <span className="params-name">颜色</span>
                                    <ul className="params-colors">
                                        {bros.map(items=>{
                                            return(
                                                <li key={items.id} className={item===items?"cur":""}>
                                                    <Link to={"/detail/"+items.id}>
                                                        <i>
                                                            <img src={items.color}  alt=""/>
                                                        </i>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="sku-dynamic-params clear">
                                    <div className="params-name">数量</div>
                                    <div className="params-detail clear">
                                        <div className="item-num js-select-quantity">
                                            <span 
                                                className={["down",this.state.nub===1?"down-disabled":""].join(" ")}
                                                onClick={this.down.bind(this)}
                                            >-</span>
                                            <span className="num">{this.state.nub}</span>
                                            <span 
                                                className={["up", this.state.nub === 10 ? "up-disabled" : ""].join(" ")} 
                                                onClick={this.up.bind(this)}
                                            >+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sku-status">
                                <div className="cart-operation-wrapper clearfix">
                                    <span className="blue-title-btn js-add-cart">
                                        <a>加入购物车</a>
                                    </span>
                                    <span className="gray-title-btn">
                                        <a>现在购买</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
			    </div>
		    </div>
        );
    }
}

export default connect(state => {
    return {
        items: state.items
    }
})(Detail);