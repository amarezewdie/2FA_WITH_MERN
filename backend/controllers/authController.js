import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const register = async (req, res) => {
  console.log(req);
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.json({ success: false, message: "all filed are required" });
    }

    const userExist = await userModel.findOne({ username });
    if (userExist) {
      return res.json({ success: false, message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      password: hashPassword,
      isTwoFaActive: false,
    });
    await newUser.save();
    console.log(newUser);

    res.json({ success: true, message: "user register successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  console.log("auth user", req.user);
  res.json({
    success: true,
    username: req.user.username,
    isTwoFaActive: req.user.isTwoFaActive,
  });
};
const authStatus = async (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      username: req.user.username,
      isTwoFaActive: req.user.isTwoFaActive,
    });
  } else {
    return res.json({ success: false, message: "un auth" });
  }
};

const logOut = async (req, res) => {
  if (!req.user) {
    return res.json({ success: false, message: "un auth user" });
  }
  req.logOut((err) => {
    if (err) return res.json({ success: false, message: "user not login" });
    return res.json({ success: true, message: "logout successfully" });
  });
};

const twoFaSetup = async (req, res) => {
  try {
    console.log("the req.user", req.user);
    const user = req.user;
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    user.isTwoFaActive = true;
    await user.save();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.amareTech.com",
      encoding: "base32",
    });
    const qrCodeImageUrl = await qrcode.toDataURL(url);
    res.json({
      secret: secret,
      qrCode: qrCodeImageUrl,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
const twoFaVerify = (req, res) => {
  try {
    const { token } = req.body;

    // Validate request body
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required for 2FA verification",
      });
    }

    const user = req.user;

    // Ensure user data is present
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({
        success: false,
        message: "Invalid user or 2FA setup",
      });
    }

    // Verify the provided token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (verified) {
      const jwtToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Add expiration
      );

      return res.status(200).json({
        success: true,
        token: jwtToken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid 2FA token",
      });
    }
  } catch (error) {
    console.error("Error during 2FA verification:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying 2FA",
    });
  }
};

const twoFaReset = (req, res) => {
  try {
    const user = req.user;
    user.isTwoFaActive = false;
    user.twoFactorSecret = "";
    return res
      .status(200)
      .json({ success: true, message: "2fa reset successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export {
  register,
  login,
  authStatus,
  logOut,
  twoFaSetup,
  twoFaVerify,
  twoFaReset,
};
