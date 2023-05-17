//token authenticator for user small security measure
import config from '../config';
import {getConnection} from "../database/database";


const jwt = require('jsonwebtoken');

const createToken = (iduser) => {
  const token = jwt.sign({ iduser: iduser}, config.JWT_SECRET, { expiresIn: "1h" });
  return token;
};



const createDBToken = async (req, res) => {
  try {
    const { nickname } = req.body;
    const connection = await getConnection();
    const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const idusers = iduser.map((row) => row.iduser);
    const token = createToken(idusers[0]);
    const result = await connection.query("INSERT INTO tokens (iduser, token) VALUES (?, ?)", [idusers[0], token]);
    res.status(205).json("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};



const verification = async (req, res) => {
  try {
    const { nickname } = req.params;
    const connection = await getConnection();
    const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const idusers = iduser.map((row) => row.iduser);
    const token = await connection.query("SELECT token FROM tokens WHERE iduser = ?", [idusers[0]]);
    const token1 = token.map((row) => row.token);
    console.log(token1[0]);
    const decoded = jwt.verify(token1[0], config.JWT_SECRET);
    console.log(decoded);
    if (decoded.iduser === idusers[0]){
      res.status(200).json("Success");
    } else {
      res.status(401).json("Error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};

const deleteToken = async (req, res) => {
  try {
    const { nickname } = req.params;
    const connection = await getConnection();
    const iduser = await connection.query("SELECT iduser FROM users WHERE nickname = ?", [nickname]);
    const idusers = iduser.map((row) => row.iduser);
    const result = await connection.query("DELETE FROM tokens WHERE iduser = ?", [idusers[0]]);
    if (result.affectedRows > 0) {
      res.status(200).json("Success");
    } else {
      res.status(404).json("Error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error");
  }
};


 

export const methods = {
    createToken,
    createDBToken,
    deleteToken,
    verification
};



