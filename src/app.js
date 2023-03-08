import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from "./routes/language.routes";

const app = express();// servir para crear un servidor web que maneje rutas/peticiones a traves de request http(get post put delete)

// Settings
app.set("port", 2506);// seteamos el puerto del servidor

// Middlewares
app.use(morgan("dev"));// morgan es un middleware que nos permite ver por consola las peticiones que se hacen al servidor

// Routes
app.use("/api/languages", languageRoutes);// usamos las rutas de language.routes.js

export default app; // exportamos el servidor para poder usarlo en index.js