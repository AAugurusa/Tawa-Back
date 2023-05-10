import {Router} from "express";
import { methods as statscontroller } from "../controllers/stats.controller";

const router = Router();
router.post("/signup", statscontroller.createStats);
router.put("/signup", statscontroller.setStatsTo0);
router.put("/updateT_merge/:nickname", statscontroller.updateT_merge);
router.put("/updateT_buy/:nickname", statscontroller.updateT_buy);
router.put("/updateEnemy_kills/:nickname", statscontroller.updateEnemy_kills);
router.put("/updateCur_spent/:nickname", statscontroller.updateCur_spent);
router.put("/updateHigh_score/:nickname", statscontroller.updateHigh_score);
router.put("/updateGame_time/:nickname", statscontroller.updateGame_time);


export default router;