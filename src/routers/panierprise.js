const express = require("express");
const router = new express.Router();
const PanierControlls = require('../../controllers/PanierpriseController');


router.post("/createorderproduct", PanierControlls.NewCreateBasket);
router.get("/getorderproduct", PanierControlls.Getallbasket);
router.get("/getorderproduct/:id", PanierControlls.getAllBasketId);
router.get("/getorderproductclient/:id", PanierControlls.getAllBasketProductClient);
module.exports = router;