import {getConnection} from "../database/database";

const getMapsById = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM maps WHERE idmap = ?", [idmap]);
        res.json(result[0]);
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const saveMap = async (req,res)=>{
    try{
        const { arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name } = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO maps (arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name) VALUES (?,?,?,?,?,?,?,?,?)", [arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name]);
        var idmap = result.insertId;
        var idmaps = idmap.toString();
        res.status(201).json(idmaps)
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const deleteMap = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM maps WHERE idmaps = ?", [idmap]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}







export const methods = {
    getMapsById,
    saveMap,
    deleteMap
    }