import express from "express";
import morgan from "morgan";
import cors from "cors";
import traineeRoutes from "./trainee.routes.js";
import videogameRoutes from "./videogame.routes.js";
import session from "express-session";
import cookieParser from 'cookie-parser';
import "dotenv/config";

import passport from 'passport';
import flash from 'express-flash';
import bodyParser from "body-parser";

import { initializePassport } from "./passport-config.js";

const app = express();
app.use(cookieParser('secret'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret', // Llave secreta
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60*60*1000)
  },
}));

// Headers necesarios para recibir peticiones de la página en localhost.
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
initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:5000"],
  credentials: true,
}));

// Rutas que se utilizarán para los endpoints.
app.use(traineeRoutes);
app.use(videogameRoutes);


app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
