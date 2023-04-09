import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:uid" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
