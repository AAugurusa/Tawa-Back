import {Router} from "express";
import { methods as userscontroller } from "../controllers/users.controller";

const router = Router();

router.get("/", userscontroller.getUsers);
router.get("/:nickname/login", userscontroller.getUser);
router.delete("/:nickname", userscontroller.deleteUser);
router.put("/:nickname1", userscontroller.updateUser);
router.post("/signUp", userscontroller.addUser);

export default router;