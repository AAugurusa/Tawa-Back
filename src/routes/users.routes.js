import {Router} from "express";
import { methods as userscontroller } from "../controllers/users.controller";

const router = Router();

router.get("/", userscontroller.getUsers);

export default router;