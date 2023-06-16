



  




import { Router } from "express";
import {
    getTopScore,
    getMonedas,
    updateMonedas,
    updateSetMonedas,
    updateTopScore,
    insertBuyCosmetic
} from "./videogame.controllers.js";

import passport from "passport";

const router = Router();

router.put("/updateMonedas", updateMonedas);

router.get("/getTopScore", getTopScore);

router.get("/getMonedas", getMonedas);

router.put("/updateTopScore", updateTopScore);

router.put("/updatSetMonedas", updateSetMonedas);

router.post("/insertBuyCosmetic", insertBuyCosmetic);


export default router;