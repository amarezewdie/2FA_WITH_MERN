import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUpTwoFa } from "../service/authApi";

const TwoFaSetup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({ secret: "", qrCode: "" });

  const fetchQrCode = async () => {
    try {
      const { data } = await setUpTwoFa();
      setResponse({
        ...data,
        secret: data.secret.base32,
      });
      console.log(data);
    } catch (error) {
      console.error("Error fetching 2FA setup:", error);
    }
  };

  useEffect(() => {
    fetchQrCode();
  }, []);

  const onSetupComplete = () => {
    navigate("/verify-2fa");
  };
  //copy clipboard
  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard!");
    setTimeout(() => setMessage(""), 3000);
  };
  return (
    <div className="bg-slate-300 max-w-lg sm:w-[300px] p-3 shadow-lg rounded-lg gap-6 ">
      <div className="flex flex-col gap-1">
        <h1 className="capitalize text-2xl">turn on two fa verification</h1>
        <h1>SCAN THE QR CODE</h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex w-full p-3 rounded-lg">
          {response.qrCode ? (
            <img
              src={response.qrCode}
              alt="QR code for enabling two-factor authentication"
              className="w-full rounded-lg p-3"
            />
          ) : (
            ""
          )}
        </div>
        <div className="text-center mb-2 capitalize">
          enter qr code manually
        </div>
      </div>
      <div>
        {message && (
          <p className="text-center font-light text-green-200">{message}</p>
        )}
        <input
          readOnly
          value={response.secret || ""}
          onClick={copyClipBoard}
          className="w-full p-3"
        />
      </div>
      <button
        className="w-full p-3 bg-slate-700 text-white my-2 capitalize rounded-lg"
        onClick={onSetupComplete}
      >
        continue to verification
      </button>
    </div>
  );
};

export default TwoFaSetup;
