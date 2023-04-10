import "./App.css";
import { Route, Routes, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/home/home.jsx";
import Login from "./components/login/login.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home/:uid" element={<Home />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
