const express = require("express");
const router = new express.Router();
const PanierControlls = require('../../controllers/PanierpriseController');


router.post("/createorderproduct", PanierControlls.CreateOrderproduct);
router.get("/getorderproduct", PanierControlls.getAllOrderProduct);
router.get("/getorderproduct/:id", PanierControlls.getAllOrderProductId);
router.get("/getorderproductclient/:id", PanierControlls.getAllOrderProductClient);
module.exports = router;