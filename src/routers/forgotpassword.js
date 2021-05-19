const express = require("express");
const router = new express.Router();
const ForgotPassword = require('../../service/ForgotPassword');

router.post("/sendnumber", ForgotPassword.SendNumber);
router.post("/sendtoken", ForgotPassword.SendToken);
router.post("/findusernumber", ForgotPassword.FindUserNumber);
router.patch("/finduserpasswordchange/:id",ForgotPassword.FindUserChangePassword);
module.exports = router;