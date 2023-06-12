import { Router } from "express";


import { 
    getCursos,
    getCursosTomados,
    getEmpleado,
    getEmpleados
} from "./trainee.controllers.js";

import passport from "passport";

const router = Router();

router.get("/getEmpleado/:id", getEmpleado);
router.get("/getEmpleados", getEmpleados);
router.get("/getCursos", getCursos);
router.get("/getCursosTomados/:id", getCursosTomados);


  


export default router;