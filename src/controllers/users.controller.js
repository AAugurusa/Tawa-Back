import {getConnection} from "../database/database";

//User getters
const getUsers = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users");
        console.log(result);
        res.json(result);
    } catch(error){
        res.status(501);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }  
};

//User ABM

const addUser = async (req,res)=>{
    try{
        const { nickname, password } = req.body;

        if(nickname == undefined || password == undefined){
            res.status(400).json({message: "Bad Request, please fill all fields."});//indica error en peticion al servidor por eso "400"
        }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO users (nickname, password) VALUES (?,?)",[nickname, password]);
        res.status(201).json("Success");
    } catch(error){
        console.log(error);
        res.status(502).json("Nickname already in use");//indica error en peticion al servidor por eso "500"
    }  
};

const login = async (req,res)=>{
    try{
        const { nickname, password } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE nickname = ? AND password = ?", [nickname, password]);    
        if(result.length == 0){
            res.status(501).json("Nickname or password incorrect");
        }else{
            res.status(201).json("Success");
        }
    } catch(error){
        console.log(error);
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const deleteUser = async (req,res)=>{
    try{ 
        const { nickname } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM users WHERE nickname = ?", nickname);
        res.json(result);
    } catch(error){
        res.status(502);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }  
};

const updateUser = async (req,res)=>{
    try{ 
        const { nickname1 } = req.params;
        const { nickname, password } = req.body;
        if(nickname == undefined || password == undefined || nickname1 == undefined){
            res.status(400).json({message: "Bad Request, please fill all fields."});//indica error en peticion al servidor por eso "400"
        }
         
        const newUser = { nickname, password };
        const connection = await getConnection();
        const result = await connection.query("UPDATE users SET ? WHERE nickname = ?" , [newUser, nickname1]);
        res.json(result);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }  
};

//Profile getters
const getEnemyKills = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query("SELECT enemy_kills FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",[nickname]);
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  
  const getGameTime = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT game_time FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",
        [nickname]
      );
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  
  const getHighScore = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT high_score FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",
        [nickname]
      );
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  
  const getTBuy = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT t_buy FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",
        [nickname]
      );
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  
  const getTMerge = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT t_merge FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",
        [nickname]
      );
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  
  const getCurSpent = async (req, res) => {
    try {
      const { nickname } = req.body;
      const connection = await getConnection();
      const result = await connection.query(
        "SELECT cur_spent FROM stats WHERE iduser = (SELECT iduser FROM users WHERE nickname = ?)",
        [nickname]
      );
      res.json(result);
    } catch (error) {
      res.status(503);
      res.send(error.message);
    }
  };
  

//Leaderboard getters
const getTop5UsersInEnemyKills = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, enemy_kills FROM stats ORDER BY enemy_kills DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, enemy_kills FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const getTop5UsersInGameTime = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, game_time FROM stats ORDER BY game_time DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, game_time FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const getTop5UsersInHighScore = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, high_score FROM stats ORDER BY high_score DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, high_score FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const getTop5UsersInTBuy = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, t_buy FROM stats ORDER BY t_buy DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, t_buy FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const getTop5UsersInTMerge = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, t_merge FROM stats ORDER BY t_merge DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, t_merge FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

const getTop5UsersInCurSpent = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT iduser, cur_spent FROM stats ORDER BY cur_spent DESC LIMIT 5");
        const idusers = result.map((row) => row.iduser);
        const result2 = await connection.query("SELECT nickname, cur_spent FROM users INNER JOIN stats ON users.iduser = stats.iduser WHERE users.iduser IN (?) ORDER BY FIELD(users.iduser, ?)", [idusers, idusers]);
        res.json(result2);
    } catch(error){
        res.status(503);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }
};

//Exporting methods
export const methods = {
    getUsers,
    addUser,
    login,
    deleteUser,
    updateUser,
    getEnemyKills,
    getGameTime,
    getHighScore,
    getTBuy,
    getTMerge,
    getCurSpent,
    getTop5UsersInEnemyKills,
    getTop5UsersInGameTime,
    getTop5UsersInHighScore,
    getTop5UsersInTBuy,
    getTop5UsersInTMerge,
    getTop5UsersInCurSpent  
};