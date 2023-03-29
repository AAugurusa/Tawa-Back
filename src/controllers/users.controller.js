import {getConnection} from "../database/database";

const getUsers = async (req,res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users");
        console.log(result);
        res.json(result);
    } catch(error){
        res.status(500);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }  
};

const getUser = async (req,res)=>{
    try{ 
        const { nickname } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE nickname = ?", nickname);
        res,json(result);
        res.status(201).json("Success");
    } catch(error){
        res.status(501).json("Nickname not found");//indica error en peticion al servidor por eso "500"
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
        
    }
};


const deleteUser = async (req,res)=>{
    try{ 
        const { nickname } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM users WHERE nickname = ?", nickname);
        res.json(result);
    } catch(error){
        res.status(500);//indica error en peticion al servidor por eso "500"
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
        res.status(500);//indica error en peticion al servidor por eso "500"
        res.send(error.message);
    }  
};


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


export const methods = {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    login,
    addUser
};