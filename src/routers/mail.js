const express = require("express");
const router = new express.Router();
const SendMail = require('../../service/Sendreceive');

router.post("/sendmail",  SendMail.Sendreceives);

module.exports = router;