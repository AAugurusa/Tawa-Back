import {getConnection} from "../database/database";

const createSaveFile = async (req,res)=>{
    try{
        const { nickname } = req.body;
        const connection = await getConnection();
        const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const result = await connection.query("INSERT INTO save_files (iduser) VALUES (?)", [iduser[0].iduser]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const saveCampaignInCampaign1 = async (req,res)=>{
    try{
        const { nickname } = req.params;
        const { campaign1 } = req.body;
        const connection = await getConnection();
        const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const idsave_file = await connection.query("SELECT idsave_files FROM save_files WHERE iduser = ?", [iduser[0].iduser]);
        const result = await connection.query("UPDATE save_files SET campaign1 = ? WHERE idsave_files = ?", [campaign1, idsave_file[0].idsave_files]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const saveCampaignInCampaign2 = async (req,res)=>{
    try{
        const { nickname } = req.params;
        const { campaign1, campaign2, campaign3 } = req.body;
        const connection = await getConnection();
        const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const idsave_file = await connection.query("SELECT idsave_files FROM save_files WHERE iduser = ?", [iduser[0].iduser]);
        const result = await connection.query("UPDATE save_files SET campaign2 = ? WHERE idsave_files = ?", [campaign2, idsave_file[0].idsave_files]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const saveCampaignInCampaign3 = async (req,res)=>{
    try{
        const { nickname } = req.params;
        const { campaign3 } = req.body;
        const connection = await getConnection();
        const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const idsave_file = await connection.query("SELECT idsave_files FROM save_files WHERE iduser = ?", [iduser[0].iduser]);
        const result = await connection.query("UPDATE save_files SET campaign3 = ? WHERE idsave_files = ?", [campaign3, idsave_file[0].idsave_files]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const deleteCampaign2 = async (req,res)=>{
    try{
        const { nickname } = req.params;
        const connection = await getConnection();
        const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const idsave_file = await connection.query("SELECT idsave_files FROM save_files WHERE iduser = ?", [iduser[0].iduser]);
        const result = await connection.query("UPDATE save_files SET campaign2 = ? WHERE idsave_files = ?", [null, idsave_file[0].idsave_files]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const getCampaigns = async (req, res) => {
    try {
      const { nickname } = req.params;
      const connection = await getConnection();
      const iduserResult = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const iduser = iduserResult[0].iduser;
        const campaignsResult = await connection.query("SELECT campaign1, campaign2, campaign3 FROM save_files WHERE iduser = ?", [iduser]);
      console.log(campaignsResult);
    if (campaignsResult[0].campaign1 == null) {
        campaignsResult[0].campaign1 = 0;
    }
    if (campaignsResult[0].campaign2 == null) {
        campaignsResult[0].campaign2 = 0;
    }
    if (campaignsResult[0].campaign3 == null) {
        campaignsResult[0].campaign3 = 0;
    }
        res.status(200).json(campaignsResult[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error");
    }
  };

export const methods = {
    createSaveFile,
    saveCampaignInCampaign1,
    saveCampaignInCampaign2,
    saveCampaignInCampaign3,
    deleteCampaign2,
    getCampaigns
};

