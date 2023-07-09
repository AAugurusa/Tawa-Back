import {Router} from "express";
import { methods as campaignscontroller } from "../controllers/campaigns.controller";

const router = Router();

router.post("/createCampaign", campaignscontroller.createCampaign);
router.delete("/deleteCampaign/:idcampaign", campaignscontroller.deleteCampaign);
router.get("/getActualLevel/:idcampaign", campaignscontroller.getActualLevel);
router.put("/sumActualLevel/:idcampaign", campaignscontroller.sumActualLevel);


export default router; 