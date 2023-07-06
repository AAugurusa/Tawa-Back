import {Router} from "express";
import { methods as ratingscontroller } from "../controllers/ratings.controller";

const router = Router();

router.post("/rateMap/:idmap", ratingscontroller.rateMap);
router.get("/didUserRateMap/:idmap", ratingscontroller.didUserRateMap);

export default router;