import {Router} from "express";
import { methods as languagecontroller } from "../controllers/language.controller";

const router = Router();

router.get("/", languagecontroller.getLanguages);

export default router;