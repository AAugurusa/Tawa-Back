import {getConnection} from "../database/database";

const getMapsById = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        let result = await connection.query("SELECT * FROM maps WHERE idmaps = ?", [idmap]);
        result = result[0];
        const ratings = await connection.query("SELECT rate_value FROM ratings WHERE idmap = ?", [idmap]);
        var rate_median = 0;
        for(var i = 0; i < ratings.length; i++){
            rate_median += ratings[i].rate_value;
        }
        rate_median = rate_median/ratings.length;
        rate_median = parseInt(rate_median);
        if(isNaN(rate_median)){
            rate_median = 1;
        }
        result.name_map = result.map_name; 
        result.rate_median = rate_median;
        res.json({result});
}
    catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}


const saveMap = async (req,res)=>{
    try{
        const { arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name,mision_easy,mision_med,mision_hard} = req.body;
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO maps (arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name,mision_easy,mision_med,mision_hard) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,map_name,mision_easy,mision_med,mision_hard]);
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

const getRandomMap = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT idmaps, map_name FROM maps ORDER BY RAND() LIMIT 1");
        const idmap = result[0].idmaps;
        const map_name = result[0].map_name;
        const ratings = await connection.query("SELECT rate_value FROM ratings WHERE idmap = ?", [idmap]);
        var rate_median = 0;
        for(var i = 0; i < ratings.length; i++){
            rate_median += ratings[i].rate_value;
        }
        rate_median = rate_median/ratings.length;
        rate_median = parseInt(rate_median);
        if(isNaN(rate_median)){
            rate_median = 1;
        }
        res.json({idmap, map_name, rate_median});
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}


const deleteAllMaps = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM maps");
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const getMapInfo = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT arez_active,atenea_active,back_type,merge_active,path_type,poseidon_active,refund_active,zeus_active,mision_easy,mision_med,mision_hard FROM maps WHERE idmaps = ?", [idmap]);      
        res.json(result[0]);
        console.log(result[0]);
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const existsMap = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM maps WHERE idmaps = ?", [idmap]);
        console.log(result[0]);
        if(result[0] == null){
           return res.json(false);
        }else{
            return res.json(true);
        }
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const getMapNameById = async (req,res)=>{
    try{
        const { idmap } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT map_name FROM maps WHERE idmaps = ?", [idmap]);
        const mapName = result[0].map_name; 
        res.json(mapName);
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}

const getMapIdByName = async (req,res)=>{
    try{
        const { map_name } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idmaps FROM maps WHERE map_name LIKE ?", ['%'+map_name+'%']);
        var idmaps = [];
        for(var i = 0; i < result.length; i++){
            idmaps.push(result[i].idmaps);
        }
        res.json(idmaps);
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}


export const methods = {
    getMapsById,
    saveMap,
    deleteAllMaps,
    getMapInfo,
    existsMap,
    getMapNameById,
    getRandomMap,
    getMapIdByName,
    deleteMap
    }