import {Router} from "express";
import { methods as tokencontroller } from "../controllers/token.controller";

const router = Router();
router.post("/createToken", tokencontroller.createDBToken);
router.get("/verification/:nickname", tokencontroller.verification);
router.delete("/deleteToken/:nickname", tokencontroller.deleteToken);

export default router;