import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./Component/Auth";
import Admin from "./Component/Admin";
import Home from "./Component/Home";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" exact component={Auth}></Route>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
