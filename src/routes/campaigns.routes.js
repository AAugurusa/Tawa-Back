import {Router} from "express";
import { methods as campaignscontroller } from "../controllers/campaigns.controller";

const router = Router();

router.post("/createCampaign", campaignscontroller.createCampaign);
router.delete("/deleteCampaign/:idcampaign", campaignscontroller.deleteCampaign);

export default router; 