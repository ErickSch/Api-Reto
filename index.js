import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemsRoutes from "./items.routes.js";
import traineeRoutes from "./trainee.routes.js";
import videogameRoutes from "./videogame.routes.js";
import session from "express-session";
import cookieParser from 'cookie-parser';
import "dotenv/config";

import passport from 'passport';
import flash from 'express-flash';
import methodOverride from 'method-override';
import bodyParser from "body-parser";
// import connectSessionSequelize from 'connect-session-sequelize';
// import { sequelize } from "./db.js";

import { initializePassport } from "./passport-config.js";

const app = express();
// const SequelizeStore = connectSessionSequelize(session.Store);
app.use(cookieParser('secret'));
app.use(bodyParser.urlencoded({ extended: false }));

// const sessionStore = new SequelizeStore({
//   db: sequelize,
//   tableName: 'Sessions',
// });

app.use(session({
  // secret: process.env.SESSION_SECRET, // Replace with your own secret key
  secret: 'secret', // Replace with your own secret key
  // store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60*60*1000)
  },
}));

// Add the CORS middleware before defining your routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
// app.use(methodOverride('_method'))
initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:5000"],
  credentials: true,
}));
app.use(itemsRoutes);
app.use(traineeRoutes);
app.use(videogameRoutes);

// sessionStore.sync();

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
