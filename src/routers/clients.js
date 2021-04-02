const express = require("express");
const router = new express.Router();
const ClientControls= require('../../controllers/ClientController');
const  checkjwt = require('../../service/Checkjwt');
router.post("/createuser", ClientControls.CreateUser);//inscription
router.post("/login",ClientControls.Login);//authentification qui va me generer un token avec auth0
router.get('/profile/:id', checkjwt ,ClientControls.Profile );
router.patch('/profileupdate/:id',ClientControls.ProfileUpdate); // page profile update
module.exports = router;  