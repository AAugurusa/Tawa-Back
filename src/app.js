import express from "express";
import morgan from "morgan";
// Routes
import usersRoutes from "./routes/users.routes";
import statsRoutes from "./routes/stats.routes";

const app = express();// servir para crear un servidor web que maneje rutas/peticiones a traves de request http(get post put delete)

// Settings
app.set("port", 2606);// seteamos el puerto del servidor

// Middlewares
app.use(morgan("dev"));// morgan es un middleware que nos permite ver por consola las peticiones que se hacen al servidor
app.use(express.json());// para que el servidor entienda los datos que le enviamos en formato json

// Routes
app.use("/api/users", usersRoutes);// usamos las rutas de users.routes.js
app.use("/api/stats", statsRoutes);// usamos las rutas de stats.routes.js

export default app; // exportamos el servidor para poder usarlo en index.js