import {Router} from "express";
import { methods as mapscontroller } from "../controllers/maps.controller";

const router = Router();
router.post("/saveMap", mapscontroller.saveMap);
router.get("/getMap/:idmap", mapscontroller.getMapsById);
router.delete("/deleteMap/:idmap", mapscontroller.deleteMap);
router.delete("/deleteAllMaps", mapscontroller.deleteAllMaps);
router.get("/getMapInfo/:idmap", mapscontroller.getMapInfo);
router.get("/existsMap/:idmap", mapscontroller.existsMap);
router.get("/getMapNameById/:idmap", mapscontroller.getMapNameById);
router.get("/getRandomMap", mapscontroller.getRandomMap);

export default router;