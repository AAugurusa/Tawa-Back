const {body} = require("express-validator");
const {db} = require("../database/database");

const users = db.users;

module.exports = {
    addUser: [
        body("nickname").custom((value) => {
            const user = users.find(user => user.nickname === value);
            if(user){
                return Promise.reject("Nickname already in use");
            }
            return true;
        }),
    ],}