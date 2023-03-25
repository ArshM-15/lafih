import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
