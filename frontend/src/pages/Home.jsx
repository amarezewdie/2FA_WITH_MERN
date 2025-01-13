import React from "react";
import { useSessionContext } from "../context/sessionContext";
import { logOutUser } from "../service/authApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout, user } = useSessionContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await logOutUser();
      if (data.success) {
        logout(data);
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-300 p-3 rounded-lg max-w-lg sm:w-[400px] my-3 text-center flex flex-col ">
      <h1 className="font-semibold text-2xl capitalize">
        welcome, {user.username}{" "}
      </h1>
      <p className="capitalize text-xl font-light my-2">
        you have successfully login in and verify your 2fa
      </p>
      <button
        onClick={handleLogout}
        className="w-full p-3 bg-slate-800 text-white rounded-lg"
      >
        logout
      </button>
    </div>
  );
};

export default Home;
