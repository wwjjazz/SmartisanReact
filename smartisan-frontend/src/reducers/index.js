import {  
    combineReducers
} from "redux";
import items from "./items";
import carts from "./carts";

export default combineReducers({
    items,
    carts
})