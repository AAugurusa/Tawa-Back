import {Router} from "express";
import { methods as statscontroller } from "../controllers/stats.controller";

const router = Router();
router.post("/signup", statscontroller.createStats);
router.put("/signup", statscontroller.setStatsTo0);
router.put("/update/:nickname", statscontroller.updateStats);

export default router;