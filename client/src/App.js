import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
