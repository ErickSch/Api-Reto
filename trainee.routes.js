import { Router } from "express";


import { 
    deleteAreaInteres,
    deleteEmpleado,
    getAreasInteres,
    getAreasInteresEmpleado,
    getCursos,
    getCursosEncuadre,
    getCursosTomados,
    getEmpleado,
    getEmpleados,
    getEmpleadosIdNombre,
    getHistoricoTrainee,
    getPerfilEmpleado,
    getUser,
    postAreaInteres,
    postEmpleado,
    putEmpleado
} from "./trainee.controllers.js";

import passport from "passport";

const router = Router();

router.get("/getEmpleado/:id", getEmpleado);
router.get("/getEmpleados", getEmpleados);
router.get("/getEmpleadosIdNombre", getEmpleadosIdNombre);
router.put("/putEmpleado", putEmpleado);
router.get("/getPerfilEmpleado/:id", getPerfilEmpleado);
router.post("/postEmpleado", postEmpleado);
router.delete("/deleteEmpleado/:id", deleteEmpleado);


router.get("/getCursos", getCursos);
router.get("/getCursosTomados/:id", getCursosTomados);
router.get("/getCursosEncuadre/:id", getCursosEncuadre);

router.get("/getHistoricoTrainee/:id", getHistoricoTrainee);

router.get("/getUser/:id", getUser);

router.get("/getAreasInteresEmpleado/:id", getAreasInteresEmpleado);
router.get("/getAreasInteres", getAreasInteres);
router.post("/postAreaInteres/:id", postAreaInteres);
router.delete("/deleteAreaInteres/:id/:area", deleteAreaInteres);


  


export default router;