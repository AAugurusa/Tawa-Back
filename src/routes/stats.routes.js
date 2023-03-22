import {Router} from "express";
import { methods as statscontroller } from "../controllers/stats.controller";

const router = Router();
router.post("/signup", statscontroller.createStats);

export default router;