import { Router } from "express";


import { 
    getCursos,
    getCursosEncuadre,
    getCursosTomados,
    getEmpleado,
    getEmpleados,
    getPerfilEmpleado,
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
router.get("/getCursosEncuadre/:id", getCursosEncuadre);
router.get("/getUser/:id", getUser);
router.get("/getPerfilEmpleado/:id", getPerfilEmpleado);



  


export default router;