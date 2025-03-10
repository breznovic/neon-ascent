import { useEffect } from "react";
import "./App.module.css";
import Register from "./components/Register/Register";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return <Register />;
}

export default App;
