import {Router} from "express";
import { methods as userscontroller } from "../controllers/users.controller";
import { methods as tokenController } from "../controllers/token.controller";

const router = Router();
//Getters
router.get("/",userscontroller.getUsers);
//ABM
router.delete("/:nickname", userscontroller.deleteUser);
router.put("/:nickname1",userscontroller.updateUser);
router.post("/signUp", userscontroller.addUser);
router.post("/login", userscontroller.login);
router.delete("/logout/:nickname",tokenController.deleteToken);
//Leaderboards
router.get("/getLeaderboard_E_K", userscontroller.getTop5UsersInEnemyKills);
router.get("/getLeaderboard_G_T", userscontroller.getTop5UsersInGameTime);
router.get("/getLeaderboard_T_M", userscontroller.getTop5UsersInTMerge);
router.get("/getLeaderboard_T_B", userscontroller.getTop5UsersInTBuy);
router.get("/getLeaderboard_C_S", userscontroller.getTop5UsersInCurSpent);
router.get("/getLeaderboard_H_S", userscontroller.getTop5UsersInHighScore);
//Profile Stats
router.get("/getProfileStats_E_K/:nickname", userscontroller.getEnemyKills);
router.get("/getProfileStats_G_T/:nickname", userscontroller.getGameTime);
router.get("/getProfileStats_T_M/:nickname", userscontroller.getTMerge);
router.get("/getProfileStats_T_B/:nickname", userscontroller.getTBuy);
router.get("/getProfileStats_C_S/:nickname", userscontroller.getCurSpent);
router.get("/getProfileStats_H_S/:nickname", userscontroller.getHighScore);

export default router;