import { Router } from "express";
import {
  authStatus,
  logOut,
  login,
  register,
  twoFaReset,
  twoFaSetup,
  twoFaVerify,
} from "../controllers/authController.js";
import passport from "passport";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", passport.authenticate("local"), login);
authRouter.get("/status", authStatus);
authRouter.post("/logout", logOut);
authRouter.post("/setup", authMiddleware, twoFaSetup);
authRouter.post(
  "/verify",
  (req, res, next) => {
    if (req.isAuthenticated) return next();
    res.json({ success: false, message: "not auth" });
  },
  twoFaVerify
);
authRouter.post(
  "/reset",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.json({ success: false, message: "not auth" });
  },
  twoFaReset
);

export default authRouter;
