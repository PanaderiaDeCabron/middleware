const express = require("express");
const router = express.Router();

//Importacion de controladores de la base de datos
const { getProducts } = require("../controllers/product_controllers");
const { getProduct } = require("../controllers/product_controllers");
const { deleteProduct } = require("../controllers/product_controllers");
router.get("/products", getProducts)
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

const { getRecords } = require('../controllers/purchase_controller');
const { addRecord } = require('../controllers/purchase_controller');
router.get('/records/:id', getRecords);
router.post('/records', addRecord);

const { beginTrans } = require('../controllers/purchase_controller');
const { commitTrans } = require('../controllers/purchase_controller');
const { rollbackTrans } = require('../controllers/purchase_controller');
router.post('/trans', beginTrans);
router.post('/commit', commitTrans);
router.post('/rollback', rollbackTrans);

module.exports = router; //Exportacion del modulo