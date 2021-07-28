import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup-Login/Signup";
import Signin from "./Components/Signup-Login/Signin";
import Reset from "./Components/Signup-Login/Reset";
import PasswordReset from "./Components/Signup-Login/Password-reset";
import Home from "./Components/Home/Home";
import Welcome from "./Components/Welcome/Welcome";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/reset" component={Reset} />
          <Route
            exact
            path="/password-reset/:token"
            component={PasswordReset}
          />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
