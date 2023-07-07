import {getConnection} from "../database/database";

const createCampaign = async (req,res)=>{// create a campaign and set the actual level to 1 and return the id of the created campaign and return a json in json structure with the id
    try{
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO campaigns (actual_level) VALUES (1)");
        var idcampaign = result.insertId;
        var idcampaigns = idcampaign.toString();
        res.status(201).json(idcampaigns)
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
};

const deleteCampaign = async (req,res)=>{// delete a campaign by id
    try{
        const { idcampaign } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM campaigns WHERE idcampaigns = ?", [idcampaign]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
};

export const methods = {
    createCampaign,
    deleteCampaign
};
