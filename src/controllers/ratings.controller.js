import {getConnection} from "../database/database";

const rateMap = async (req, res) => {
    try{
    const {nickname, rate_value} = req.body;
    console.log(req.body);
    const {idmap} = req.params;
    const connection = await getConnection();
    const iduserfind = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const iduser = iduserfind[0].iduser;
    const result = await connection.query("INSERT INTO ratings SET ?", [{idmap, iduser, rate_value}]);
    console.log(result);
    res.json({message: "Map rated"});
    }
    catch(error){
        console.log(req.body);
        res.status(500).json(req.body);
    }
}

const didUserRateMap = async (req, res) => {
    try{
    const {nickname} = req.body;
    const {idmap} = req.params;
    console.log(nickname, idmap);
    const connection = await getConnection();
    const iduserfind = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    console.log(iduserfind[0].iduser);
    const result = await connection.query("SELECT * FROM ratings WHERE idmap = ? AND iduser = ?", [idmap, iduserfind[0].iduser]);
    if(result.length > 0){
        res.json("bool: 1");
    }
    else{
        res.json("bool: 0");
    }
    }
    catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
}





export const methods = {
    rateMap,
    didUserRateMap
}