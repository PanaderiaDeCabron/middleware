const con = require("mssql");
const masterBD = require("../database/config-master");
const slaveDB = require("../database/config-slave");

const getProducts = (param, result) => {//Obtener todos los productos de la BD
    con.connect(slaveDB, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            request.query(`SELECT Productos.ID_Producto, Productos.Nombre, Productos.Stock, Productos.ImagenProd, Productos.Precio, Categorias.NombreCat FROM Productos INNER JOIN Categorias ON Productos.IdCategoria = Categorias.Id_Categoria ORDER BY Productos.Nombre`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(r.recordset);//Devolver productos
            });
        }
    });
} 

const getProduct= (param, result) => {//Obtener producto por el id
    con.connect(slaveDB, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            request.query(`SELECT Productos.ID_Producto, Productos.Nombre, Productos.Stock, Productos.ImagenProd, Productos.Precio, Categorias.NombreCat FROM Productos INNER JOIN Categorias ON Productos.IdCategoria = Categorias.Id_Categoria WHERE Productos.ID_Producto = ${param.params.id}`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(r.recordset[0]);//Devolver producto
            });
        }
    });
} 


const deleteProduct = (param, result) => {//Eliminar el producto con su id
    con.connect(masterBD, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            request.query(`DELETE FROM Productos WHERE ID_Producto = ${param.params.id}`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(r.recordset);
            });
        }
    });
}

const addProduct = (param, result) => {//Agregar producto nuevo
    con.connect(masterBD, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            var data = param.body;
            request.query(`INSERT INTO Productos (IdCategoria, Nombre, ImagenProd, Stock, Precio) VALUES (${data.IdCategoria}, '${data.Nombre}', '${data.ImagenProd}', ${data.Stock}, ${data.Precio})`, (e, r) => {
                if (e) result.status(400).send(`Request error: ${e.message}`);
                else result.status(200).send(r.recordset);
            });
        }
    });
}

const updateProduct = (param, result) => {//Actualizar un producto
    con.connect(masterBD, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            var data = param.body;
            request.query(`UPDATE Productos SET Nombre = '${data.Nombre}', Stock = ${data.Stock}, ImagenProd = '${data.ImagenProd}', Precio = ${data.Precio}, IdCategoria = ${data.IdCategoria} WHERE ID_Producto = ${data.ID_Producto}`, (e, r) => {
                if (e)  result.status(400).send(`Request error: ${e.message}`);
                else result.status(200).send(true);
            });
        }
    });
}

const getCategories = (param, result) => {//Obtener categorias de productos
    con.connect(slaveDB, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            request.query(`SELECT * FROM Categorias ORDER BY NombreCat`, (e, r) => {
                if (e) result.status(400).send(e.message);
                else result.status(200).send(r.recordset);
            });
        }
    });
}

const getCategoryByName = (param, result) => {//Obtener categorias por su nombre
    con.connect(slaveDB, (error) => {//Conexión a la BD
        if (error) result.status(400).send(error.message);//Indicar error
        else {
            var request = new con.Request();//Nueva petición
            request.query(`SELECT * FROM Categorias WHERE NombreCat = '${param.params.name}'`, (e, r) => {
                if (e) result.status(400).send(`Request error: ${e.message}`);
                else {
                    if (r.recordset.length === 0) result.status(200).send({});    
                    else result.status(200).send(r.recordset[0]);
                }
            });
        }
    });
}

module.exports = {
    getProducts, 
    getProduct,
    deleteProduct, 
    addProduct, 
    updateProduct, 
    getCategories, 
    getCategoryByName
}
