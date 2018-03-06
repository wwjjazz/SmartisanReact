export default (state=[],action)=>{
    switch (action.type) {
        case 'ITEMS_UPDATE':
            return action.payload;
        default:
            return state;
    }
}