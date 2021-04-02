const express = require("express");
const router = new express.Router();
const PaiementControls= require('../../controllers/PaiementController');

router.post("/paiement",  PaiementControls.CreatePayment);
router.post('/getorderpaiement',PaiementControls.getAllOrderProductId);
module.exports = router;