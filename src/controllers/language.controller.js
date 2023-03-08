import {getConnection} from "../database/database";

const getLanguages = async (req,res)=>{
    const connection = await getConnection();
    const result = await connection.query("SELECT id, name, programmers FROM language");
};

export const methods = {
    getLanguages
};