import { Router } from "express";
import {
    getPeople,
    postPeople,
    deletePeople,
    updatePeople,
    getOnePeople,

    postRegister,
    postLogin,
    getProfile,
    isAuthenticated,
    postLogout,
    getLogin,
    getSessionUser,
    getIsManager,
    postEmployee,
    getEmployee,
    getIsAuthenticated,
} from "./items.controllers.js";

import passport from "passport";


const router = Router();

router.get("/getpeople", getPeople);
router.get("/getpeople/:id", getOnePeople);
router.post("/postpeople", postPeople);
router.delete("/deletepeople/:id", deletePeople);
router.put("/updatepeople/:id", updatePeople);
router.get("/getprofile/:id", isAuthenticated, getProfile);
// router.get("/logout", postLogout);
router.get("/isManager", getIsManager);
router.get("/getemployee/:id", getEmployee);
router.post("/registeremployee", postEmployee);

// Authentication 
// router.post("/register", postRegister);
router.get("/register", postRegister);
router.post("/login", passport.authenticate('local', {failureMessage: true}),  postLogin);
router.get("/login", getLogin);
router.get("/getSessionUser", getSessionUser);
router.get("/isUserAuthenticated", getIsAuthenticated);

  


export default router;