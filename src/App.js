import React from "react";
import Lesson1 from "./components/lessons/Lesson1";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/style.sass";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lesson1">Lesson 1</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/lesson1">
            <Lesson1 />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Здесь будет какая-то патриотическая речь</h2>;
}

export default App;
