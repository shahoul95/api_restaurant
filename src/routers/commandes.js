const express = require("express");
const router = new express.Router();
const CommandeControls= require('../../controllers/CommandeController');

router.post("/createorder",  CommandeControls.CreateOrder);
router.get("/getorder",  CommandeControls.getAllCommande);
router.get("/getorder/:id", CommandeControls.getAllCommandeId);
module.exports = router;