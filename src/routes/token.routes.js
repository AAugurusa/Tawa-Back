import {Router} from "express";
import { methods as tokencontroller } from "../controllers/token.controller";

const router = Router();
router.get("/createToken", tokencontroller.createToken);
router.get("/info", tokencontroller.verification);

export default router;