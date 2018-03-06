import React from "react";
import ReactDOM from "react-dom";
import { 
    BrowserRouter
} from "react-router-dom";
import {  
    createStore,
    applyMiddleware
} from "redux";
import reduxThunk from "redux-thunk";
import {  
    Provider
} from "react-redux";
import reducers from "./reducers";

import App from "./App";

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxThunk)
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root")
);