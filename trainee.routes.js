import { Router } from "express";


import { 
    getCursos,
    getCursosTomados,
    getEmpleado,
    getEmpleados,
    getUser,
    putEmpleado
} from "./trainee.controllers.js";

import passport from "passport";

const router = Router();

router.get("/getEmpleado/:id", getEmpleado);
router.get("/getEmpleados", getEmpleados);
router.put("/putEmpleado", putEmpleado);
router.get("/getCursos", getCursos);
router.get("/getCursosTomados/:id", getCursosTomados);
router.get("/getUser/:id", getUser);


  


export default router;