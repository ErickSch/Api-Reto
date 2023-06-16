import { Router } from "express";


import { 
    deleteEmpleado,
    getCursos,
    getCursosEncuadre,
    getCursosTomados,
    getEmpleado,
    getEmpleados,
    getHistoricoTrainee,
    getPerfilEmpleado,
    getUser,
    postEmpleado,
    putEmpleado
} from "./trainee.controllers.js";

import passport from "passport";

const router = Router();

router.get("/getEmpleado/:id", getEmpleado);
router.get("/getEmpleados", getEmpleados);
router.put("/putEmpleado", putEmpleado);
router.get("/getPerfilEmpleado/:id", getPerfilEmpleado);
router.post("/postEmpleado", postEmpleado);
router.delete("/deleteEmpleado/:id", deleteEmpleado);


router.get("/getCursos", getCursos);
router.get("/getCursosTomados/:id", getCursosTomados);
router.get("/getCursosEncuadre/:id", getCursosEncuadre);

router.get("/getHistoricoTrainee/:id", getHistoricoTrainee);

router.get("/getUser/:id", getUser);


  


export default router;