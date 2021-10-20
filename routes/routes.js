const express = require("express");
const router = express.Router();

//Importacion de controladores de la base de datos
const { getProducts } = require("../controllers/product_controllers");
const { getProduct } = require("../controllers/product_controllers");
const { deleteProduct } = require("../controllers/product_controllers");
router.get("/products", getProducts) //Se asigna a una ruta URL, en este caso con metodo get por ser solicitud hacia la direccion products
router.get("/product/:id", getProduct)
router.delete("/product/:id", deleteProduct)

const { getUsers } = require("../controllers/user_controllers");
const { getUser } = require("../controllers/user_controllers");
const { deleteUser } = require("../controllers/user_controllers");
router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.delete("/user/:id", deleteUser)

const { getStorers } = require("../controllers/user_controllers");
router.get("/storers", getStorers);

const { addUser } = require("../controllers/user_controllers");
const { updateUser } = require("../controllers/user_controllers");
router.post("/users", addUser);
router.put("/users", updateUser);

const { addProduct } = require("../controllers/product_controllers");
const { updateProduct } = require("../controllers/product_controllers");
router.post("/products", addProduct);
router.put("/products", updateProduct);

const { getCategories } = require("../controllers/product_controllers");
router.get("/categories", getCategories);

const { getUserByName } = require('../controllers/user_controllers');
router.get('/user/name/:name', getUserByName);

const { getCategoryByName } = require('../controllers/product_controllers');
router.get('/category/name/:name', getCategoryByName);

const { getPurchases } = require('../controllers/purchase_controller');
const { addPurchase } = require('../controllers/purchase_controller');
router.get('/purchases/:id', getPurchases);
router.post('/purchases', addPurchase);

const { startTransaction } = require('../controllers/purchase_controller');
const { commitTransaction } = require('../controllers/purchase_controller');
const { rollbackTransaction } = require('../controllers/purchase_controller');
router.post('/trans', startTransaction);
router.post('/commit', commitTransaction);
router.post('/rollback', rollbackTransaction);

module.exports = router; //Exportacion del modulo
/*module.exports = {
    all: function(req, res){
        res.send('All todos')
    },
    viewOne: function(req, res){
        console.log('Viewing ' + req.params.id);
    },
    create: function(req, res){
        console.log('Todo created')
    },
    destroy: function(req, res){
        console.log('Todo deleted')
    },
    edit: function(req, res){
        console.log('Todo ' + req.params.id + ' updated')
    }
};*/