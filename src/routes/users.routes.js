import {Router} from "express";
import { methods as userscontroller } from "../controllers/users.controller";

const router = Router();

router.get("/", userscontroller.getUsers);
router.get("/:nickname", userscontroller.getUser);
router.delete("/:nickname", userscontroller.deleteUser);
router.put("/:nickname1", userscontroller.updateUser);
router.post("/", userscontroller.addUser);

export default router;