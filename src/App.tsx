import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.module.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
