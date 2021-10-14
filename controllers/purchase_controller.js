const con = require("mssql");//Variable para realizar conexión a la base de datos
const masterBD = require("../database/config-master");//Obtenemos datos para conexión base de datos maestra
const slaveBD = require("../database/config-slave");//Obtenemos datos para conexión a base de datos esclava

const addPurchase = (param, result) => {//Agregar una nueva compra a la BD
    con.connect(masterBD, (error) => {//Realizar conexión
        if (error) result.status(400).send(error.message);//Indicar error
		else {
            var insert = new con.Request();//Nueva petición
            const purchaseInfo = param.body;//Obtener datos para agregar compra
            insert.query(`INSERT INTO Compra (idUsuario, idProducto, Cantidad, FechaCom, Estado, Total) VALUES (${purchaseInfo.idUsuario}, ${purchaseInfo.idProducto}, ${purchaseInfo.Cantidad}, GETDATE(), '${purchaseInfo.Estado}', ${purchaseInfo.Total})`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(true);//Compra agregada exitosamente
            });
        }
    });
}

const getPurchases = (param, result) => {//Obtener las compras de un usuario específico
    con.connect(slaveBD, (error) => {//Realizar conexión a la BD
        if (error) result.status(400).send(error.message);//Hubo un error, retornarlo
        else {
            var select = new con.Request();//Crear nueva petición
            const userID = param.params.id;//Obtener id del usuario
            select.query(`SELECT *FROM Compra WHERE idUsuario = ${userID}`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(r.recordset);//Retornar valores obtenidos
            });
        }
    });
}

const startTransaction = (param, result) => {//Para indicar que se empezará una transacción para posteriormente realizarla o quitarla
    con.connect(masterBD, (error) => {//Conectar a BD
        if (error)  result.status(400).send(error.message);
        else {
            var startTrans = new con.Request();//Nueva perición
            startTrans.query(`START TRANSACTION`, (e, r) => {//Iniciamos la transacción
                if (e) result.status(400).send(e.message);
                else result.status(200).send(true);//Transacción iniciada correctamente
            });
        }
    });
}

const rollbackTransaction = (param, result) => {//Eliminar la transacción previamente creada
    con.connect(masterBD, (error) => {//Conectar a la BD
        if (error) result.status(400).send(error.message);
        else {
            var request = new con.Request();//Nueva petición
            request.query(`ROLLBACK`, (e, r) => {//Eliminamos la transacción
                if (e) result.status(400).send(e.message);
                else result.status(200).send(true);//Transacción eliminada correctamente
            });
        }
    });
}

const commitTransaction = (param, result) => {//Realizar la transacción previamente creada
    con.connect(masterBD, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);
        else {
            var commitTrans = new con.Request();//Nueva petición
            commitTrans.query(`COMMIT`, (e, r) => {//Realizamos la transacción
                if (e) result.status(400).send(e.message);
                else result.status(200).send(true);//Transacción realizada correctamente
            });
        }
    });
}

module.exports = {
    addPurchase,
    getPurchases, 
    startTransaction,
    rollbackTransaction,  
    commitTransaction
}
