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

const updateT_merge = async (req, res) => {
  try {
    const { nickname } = req.params;
    const { t_merge } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    const result = await connection.query("UPDATE stats SET t_merge = t_merge + ? WHERE idstats = ?", [t_merge, statsID[0].idstats]);
    res.status(201).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};


const updateT_buy = async (req,res)=>{
  try{
    const { nickname } = req.params;
    const { t_buy } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    const result = await connection.query("UPDATE stats SET t_buy = t_buy + ? WHERE idstats = ?", [t_buy, statsID[0].idstats]);
    res.status(201).json("Success");
  }catch(error){
    console.log(error);
    res.status(500).json("Error");
  }
};

const updateEnemy_kills = async (req,res)=>{
  try{
    const { nickname } = req.params;
    const { enemy_kills } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    const result = await connection.query("UPDATE stats SET enemy_kills = enemy_kills + ? WHERE idstats = ?", [enemy_kills, statsID[0].idstats]);
    res.status(201).json("Success");
  }catch(error){
    console.log(error);
    res.status(500).json("Error");
  }
};

const updateCur_spent = async (req,res)=>{
  try{
    const { nickname } = req.params;
    const { cur_spent } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    const result = await connection.query("UPDATE stats SET cur_spent = cur_spent + ? WHERE idstats = ?", [cur_spent, statsID[0].idstats]);
    res.status(201).json("Success");
  }catch(error){
    console.log(error);
    res.status(500).json("Error");
  }
};

const updateHigh_score = async (req,res)=>{
  try{
    const { nickname } = req.params;
    const { high_score } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    const prev_HS = await connection.query("SELECT high_score FROM stats WHERE idstats = ?", [statsID[0].idstats]);
    if(prev_HS[0].high_score < high_score){
      const result = await connection.query("UPDATE stats SET high_score = ? WHERE idstats = ?", [high_score, statsID[0].idstats]);
      res.status(201).json("Success");
    }
    else{
      res.status(201).json("Did not beat high score");
    }
  }catch(error){
    console.log(error);
    res.status(500).json("Error");
  }
};

const updateGame_time = async (req,res)=>{
  try{
    const { nickname } = req.params;
    const { game_time } = req.body;
    const connection = await getConnection();
    const body = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const statsID = await connection.query("SELECT idstats FROM stats WHERE iduser = ?", [body[0].iduser]);
    console.log(statsID[0].idstats);
    const result = await connection.query("UPDATE stats SET game_time = game_time + ? WHERE idstats = ?", [game_time, statsID[0].idstats]);
    res.status(201).json("Success");
  }catch(error){
    console.log(error);
    res.status(500).json("Error");
  }
};


export const methods = {
    createStats,
    setStatsTo0,
    updateT_merge,
    updateT_buy,
    updateEnemy_kills,
    updateCur_spent,
    updateHigh_score,
    updateGame_time
};