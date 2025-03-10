import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.tsx";
import AboutCharacter from "./components/AboutCharacter/AboutCharacter.tsx";
import Home from "./components/Home/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<App />} />
        <Route path="/about-character" element={<AboutCharacter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
