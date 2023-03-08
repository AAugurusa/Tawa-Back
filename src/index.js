import app from "./app";

const main=()=>{
    app.listen(app.get("port"));// escuchamos el puerto del servidor desde el archivo app.js
    console.log(`Server on port ${app.get("port")}`);// ver que es ``
};

main();// ejecutamos de servidor con node.js
