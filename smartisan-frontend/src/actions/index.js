import axios from "axios";

// 商品更新
export const itemsUpdate = ()=>{
    return dispatch =>{
        axios.get("/api/item").then(res => {
            dispatch({
                type: "ITEMS_UPDATE",
                payload: res.data.data
            })
        })
    }
}

// 购物车更新
export const cartsUpdate = dataArr=>{
    return dispatch => {
        if(localStorage.getItem("uid")){
            axios({
                method: "GET",
                url: "/cart"
            }).then(res => {
                console.log(res)
                dispatch({
                    type: "CARTS_UPDATE",
                    payload: res.data.data
                })
            })
        }else{
            dispatch({
                type: "CARTS_UPDATE",
                payload: dataArr
            })
        }
        
    }
}