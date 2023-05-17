import express, { json } from "express";
import morgan from "morgan";
import config from "./config";
import cookieParser from "cookie-parser";

// Routes
import usersRoutes from "./routes/users.routes";
import statsRoutes from "./routes/stats.routes";
import tokenRoutes from "./routes/token.routes";

const app = express();// servir para crear un servidor web que maneje rutas/peticiones a traves de request http(get post put delete)





// Settings
app.set("port", 2606);// seteamos el puerto del servidor
app.set("JWT_SECRET", config.JWT_SECRET);// seteamos la variable JWT_SECRET para poder usarla en el servidor

// Middlewares
app.use(morgan("dev"));// morgan es un middleware que nos permite ver por consola las peticiones que se hacen al servidor
app.use(express.json());// para que el servidor entienda los datos que le enviamos en formato json
app.use(express.urlencoded({extended: false}));// para que el servidor entienda los datos que le enviamos en formato urlencoded (ejemplo: nombre=juan&apellido=lopez
app.use(cookieParser());// para que el servidor entienda las cookies que le enviamos

// Routes
app.use("/api/users", usersRoutes);// usamos las rutas de users.routes.js
app.use("/api/stats", statsRoutes);// usamos las rutas de stats.routes.js
app.use("/api/token", tokenRoutes);// usamos las rutas de token.routes.js
app.use(cookieParser());

export default app; // exportamos el servidor para poder usarlo en index.js