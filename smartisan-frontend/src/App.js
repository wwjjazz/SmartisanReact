import React,{ Component } from "react";
import {
    Route,
    Switch
} from "react-router-dom";
// import {  
//     connect
// } from "react-redux";

import HasHeader from "./components/hasheader";
import Login from "./pages/login";
import "./assets/css/reset.css";

class App extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={HasHeader} />
                </Switch>
                
                
            </div>
        );
    }
}

// export default connect(undefined,undefined,undefined,{ pure: false })(App);

export default App;