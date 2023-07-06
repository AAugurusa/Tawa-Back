import {Router} from "express";
import { methods as ratingscontroller } from "../controllers/ratings.controller";

const router = Router();

router.post("/rateMap/:idmap", ratingscontroller.rateMap);
router.post("/didUserRateMap/:idmap", ratingscontroller.didUserRateMap);

export default router;