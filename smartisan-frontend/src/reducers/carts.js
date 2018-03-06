export default (state=[],action)=>{
    switch (action.type) {
        case "CARTS_UPDATE":
            return action.payload;
        default:
            return state;
    }
}