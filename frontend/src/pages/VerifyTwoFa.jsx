import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetTwoFa, verifyTwoFa } from "../service/authApi";

const VerifyTwoFa = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [error, setError] = useState(null);

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyTwoFa(otp);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setOtp("");
      setError("invalid otp");
    }
  };
  const handleReset2Fa = async () => {
    try {
      const { data } = await resetTwoFa();
      if (data) {
        navigate("/setup-2fa");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <form
      onSubmit={handleVerification}
      className="bg-slate-300 p-3 flex flex-col gap-4 items-center mx-auto max-w-lg sm:w-[400px]"
    >
      <h1 className="capitalize font-bold text-2xl">validate ToTp</h1>
      <h2 className="capitalize font-semibold text-xl text-center">
        please enter 6 digit OTp two verify 2Fa Auth{" "}
      </h2>
      <div className="w-full p-3">
        <label htmlFor="totp" className="text-start font-semibold p-2">
          TOTP
        </label>
        <input
          type="text"
          id="totp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="enter your TOTP"
          required
          className="w-full p-3 rounded-lg capitalize"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full p-3 bg-slate-600 text-white rounded-lg capitalize"
      >
        verify otp
      </button>
      <button
        onClick={handleReset2Fa}
        type="button"
        className="w-full p-3 bg-slate-800 text-white rounded-lg capitalize"
      >
        reset otp
      </button>
    </form>
  );
};

export default VerifyTwoFa;
