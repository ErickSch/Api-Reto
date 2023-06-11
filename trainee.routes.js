import { Router } from "express";

import passport from "passport";

import { getEmpleado} from "./trainee.controllers";


const router = Router();

router.get("/getEmpleado/:id", getEmpleado);


  


export default router;