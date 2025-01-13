import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/authApi";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ username: userName, password });
      if (data.success) {
        console.log(data);
        setPassword("");
        setConfirmPassword("");
        setUserName("");
        setError("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-lg bg-slate-300 sm:w-[300px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full p-3 mx-auto items-center my-7"
      >
        {error && <p className="text-red-800 ">{error}</p>}
        <h1 className="uppercase text-2xl">Register</h1>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="userName"
          className="p-3 border w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="p-3 border w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm Password"
          className="p-3 border w-full"
          required
        />
        <button className="w-full bg-black text-white rounded-lg p-3 uppercase">
          Register
        </button>
        <div className="flex self-start">
          <span>have account</span>
          <Link to={"/login"} className="text-blue-600 mx-3">
            sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
