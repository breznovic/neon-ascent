import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import s from "./Register.module.css";

type RegisterFormData = {
  username: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        data
      );
      console.log("User registered:", response.data);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className={s.container}>
      <h2>Register</h2>
      {error && <p className={s.error}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className={s.error}>{errors.username.message}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
