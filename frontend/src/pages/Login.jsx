import React, { useState } from "react";
import api from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authApi";
import { useSessionContext } from "../context/sessionContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSessionContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username: userName, password });
      if (data.success) {
        console.log(data);

        login(data);
        if (!data.isTwoFaActive) {
          navigate("/setup-2fa");
        } else {
          navigate("/verify-2fa");
        }
        console.log(data);
        setUserName("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg sm:w-[300px] shadow-lg p-3 bg-slate-300 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-lg w-full items-center "
      >
        <h1 className="uppercase text-2xl">login</h1>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="userName"
          className="p-3 border w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="p-3 border w-full"
          required
        />
        <button className="w-full bg-black text-white rounded-lg p-3 uppercase">
          login
        </button>
        <div className="flex w-full self-start">
          <span className="whitespace-nowrap">do not have an account</span>
          <Link
            to={"/register"}
            className="text-blue-500 ml-4 whitespace-nowrap underline"
          >
            sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
