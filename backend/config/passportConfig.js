import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });
      if (!user) return done(null, false, { message: "user not found" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else
        return done(null, false, {
          message: "invalid user name or password",
        });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await userModel.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
