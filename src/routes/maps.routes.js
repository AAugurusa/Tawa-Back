import {Router} from "express";
import { methods as mapscontroller } from "../controllers/maps.controller";

const router = Router();
router.post("/saveMap", mapscontroller.saveMap);
router.get("/getMap/:idmap", mapscontroller.getMapsById);
router.delete("/deleteMap/:idmap", mapscontroller.deleteMap);

export default router;