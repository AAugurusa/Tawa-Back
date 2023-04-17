import {Router} from "express";
import { methods as userscontroller } from "../controllers/users.controller";
import { methods as tokencontroller } from "../controllers/token.controller";

const router = Router();

router.get("/", tokencontroller.verification ,userscontroller.getUsers);
router.get("/:nickname", tokencontroller.verification ,userscontroller.getUser);
router.delete("/:nickname", userscontroller.deleteUser);
router.put("/:nickname1", tokencontroller.verification ,userscontroller.updateUser);
router.post("/signUp", userscontroller.addUser);
router.post("/login", userscontroller.login);

export default router;