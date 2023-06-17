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
    getPotenciales,
    getRotaciones,
    getUser,
    postAreaInteres,
    postEmpleado,
    postRotacion,
    putEmpleado,
    postLogin,
    getLogin,
    getSessionUser
} from "./trainee.controllers.js";

import passport from "passport";

// Definición de rutas API.

const router = Router();

// Rutas necesarias para el inicio de sesión.
router.post("/login", passport.authenticate('local', {failureMessage: true}),  postLogin);
router.get("/login", getLogin);
router.get("/getSessionUser", getSessionUser);

// Rutas necesarias para endpoints de empleado.
router.get("/getEmpleado/:id", getEmpleado);
router.get("/getEmpleados", getEmpleados);
router.get("/getEmpleadosIdNombre", getEmpleadosIdNombre);
router.put("/putEmpleado", putEmpleado);
router.get("/getPerfilEmpleado/:id", getPerfilEmpleado);
router.post("/postEmpleado", postEmpleado);
router.delete("/deleteEmpleado/:id", deleteEmpleado);

// Rutas necesarias para endpoints de cursos.
router.get("/getCursos", getCursos);
router.get("/getCursosTomados/:id", getCursosTomados);
router.get("/getCursosEncuadre/:id", getCursosEncuadre);

// Rutas necesarias para endpoints de historico.
router.get("/getHistoricoTrainee/:id", getHistoricoTrainee);

// Rutas necesarias para endpoints de usuario.
router.get("/getUser/:id", getUser);

// Rutas necesarias para endpoints de áreas de interés.
router.get("/getAreasInteresEmpleado/:id", getAreasInteresEmpleado);
router.get("/getAreasInteres", getAreasInteres);
router.post("/postAreaInteres/:id", postAreaInteres);
router.delete("/deleteAreaInteres/:id/:area", deleteAreaInteres);

// Rutas necesarias para endpoint de rotaciones.
router.get("/getRotaciones", getRotaciones);
router.post("/postRotacion", postRotacion);

// Rutas necesarias para endpoints de potenciales
router.get("/getPotenciales", getPotenciales);
  


export default router;