import "./App.css";
import { Route, Router } from "react-router-dom";
import Home from "./components/home/home.jsx";
import Login from "./components/login/login.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home/:uid" element={<Home />} />
        <Route exact path="/" element={<Login />} />
      </Router>
    </div>
  );
}

export default App;
