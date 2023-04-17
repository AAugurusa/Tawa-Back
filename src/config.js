import {config} from "dotenv";

config();// corre env

export default {
    host: process.env.HOST||"",
    database: process.env.DATABASE||"",
    user: process.env.USER||"",
    password: process.env.PASSWORD||"",
    port: process.env.PORT||"",
    JWT_SECRET: process.env.JWT_SECRET||""
};