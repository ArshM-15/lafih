import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/home/:uid" element={<Home />} />
      </Switch>
    </div>
  );
}

export default App;
