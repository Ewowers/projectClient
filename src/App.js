import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Component/Auth";
import Admin from "./Component/Admin";
import User from "./Component/User";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth}></Route>
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
      </Switch>
    </Router>
  );
};

export default App;
