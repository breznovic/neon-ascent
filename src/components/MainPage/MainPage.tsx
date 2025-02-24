import s from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className="neonText">Welcome to Synth City</h1>
      <p>Your adventure begins here.</p>
    </div>
  );
};

export default MainPage;
