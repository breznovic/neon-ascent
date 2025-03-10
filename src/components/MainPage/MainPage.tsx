import { useEffect } from "react";
import s from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={s.container}>
      <h1 className="neonText">Welcome to Synth City</h1>
      <p className={s.text}>
        The city government promised to give 10 ⛃ credits to anyone who fills
        out the registration form.
      </p>
      <p className={s.text}>
        So you didn't have to be persuaded for long to go to the special
        department.
      </p>
      <button onClick={() => navigate("/about-character")}>Continue</button>
    </div>
  );
};

export default MainPage;
