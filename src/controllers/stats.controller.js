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
const setStatsTo0 = async (req,res)=>{
    try{
        const { nickname } = req.body;
        const connection = await getConnection();
        const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
        const result = await connection.query("UPDATE stats SET t_merge = 0, t_buy = 0, enemy_kills = 0, cur_spent = 0, high_score = 0, game_time = 0 WHERE iduser = ?", [body[0].iduser]);
        res.status(201).json("Success");
    }catch(error){
        console.log(error);
        res.status(500).json("Error");
    }
};



const updateStats = async (req, res) => {
    try {
      const { nickname } = req.params;
      const { t_merge, t_buy, enemy_kills, cur_spent, high_score, game_time } = req.body;
      const connection = await getConnection();
      const userID = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
      const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [userID[0].iduser]);
      const result = await connection.query(
        "UPDATE stats SET t_merge = t_merge + ?, t_buy = t_buy + ?, enemy_kills = enemy_kills + ?, cur_spent = cur_spent + ?, high_score = ?, game_time = game_time + ? WHERE idstats = ?",
        [t_merge, t_buy, enemy_kills, cur_spent, high_score, game_time,statsID[0].idstats]
      );
      res.json(result);
    } catch (error) {
      res.status(500); // indicates an error in the server request, hence "500"
      res.send(error.message);
    }
  };

export const methods = {
    createStats,
    setStatsTo0,
    updateStats
};