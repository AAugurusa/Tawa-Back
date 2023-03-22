import {getConnection} from "../database/database";

const createStats = async (req,res)=>{
    try{
        const { nickname } = req.body; 

        console.log(req.body);
        
    
        const connection = await getConnection();
        const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const result = await connection.query("INSERT INTO stats (iduser) VALUES (?)", [body[0].iduser]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
};

export const methods = {
    createStats
};