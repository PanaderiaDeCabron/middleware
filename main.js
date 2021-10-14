const express = require("express");//Modulo express
const router = require("./routes/routes"); //Relaciona rutas URL con metodos
const bodyParser = require("body-parser"); //Parser de JSON

const app = express(); //Crea instancia de la aplicacion para cuando corra
app.use(bodyParser.json());
app.use("/", router);
app.listen(8081, () => console.log("Server is running on http//localhost:8081")); //Asignación del puerto local