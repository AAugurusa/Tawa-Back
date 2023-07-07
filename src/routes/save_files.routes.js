import {Router} from "express";
import { methods as savescontroller } from "../controllers/save_files.controller";

const router = Router();

router.post("/signUp", savescontroller.createSaveFile);
router.get("/getCampaigns/:nickname", savescontroller.getCampaigns);
router.put("/saveCampaignInCampaign1/:nickname", savescontroller.saveCampaignInCampaign1);
router.put("/saveCampaignInCampaign2/:nickname", savescontroller.saveCampaignInCampaign2);
router.put("/saveCampaignInCampaign3/:nickname", savescontroller.saveCampaignInCampaign3);
router.put("/deleteCampaign2/:nickname", savescontroller.deleteCampaign2);

export default router;