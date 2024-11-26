import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import "./config/passportConfig.js";

import "dotenv/config";
import authRouter from "./routes/authRoute.js";
import connectDb from "./config/connsctDb.js";

//config
connectDb();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors({}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`server Running on port ${port}`);
});
