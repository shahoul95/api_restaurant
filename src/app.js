// Importation des modules
const express = require("express");
const mongoose = require("mongoose");

const produitRouter = require("./routers/produits");
const commandeRouter = require("./routers/commandes");
const clientRouter = require("./routers/clients");
const panierpriseRouter = require('./routers/panierprise');
const paiement = require('./routers/paiement');
const mail = require('./routers/mail');
const forgotpassword = require('./routers/forgotpassword')
// const billetRouter = require("./routers/billets");
// const incriptionRouter = require("./routers/inscription");
// const authRouter = require("./routers/auth");
var cors = require('cors')
var btoa = require('btoa');
require("dotenv").config();

console.log(process.env.CONNECTION_URI, process.env.PORT);

// Connexion a la bdd atlas
const optionsMongoose = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose
  .connect(process.env.CONNECTION_URI, optionsMongoose)
  .then(() => {
    console.log("Connexion a Atlas réussi");
  })
  .catch((e) => {
    console.log("Connexion a Atlas echoué", e);
  });

// Initialisation des variables
const port = process.env.PORT || 8088;

// Création du server
const app = express();

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


// Définition des middleware
app.use(express.json());
app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  res.setHeader('Cross-origin-Embedder-Policy', 'require-corp');  
  res.setHeader('Cross-origin-Opener-Policy','same-origin');  
  if (req.method === 'OPTIONS') 
  {   res.sendStatus(200)  } 
  else {    next()  }});

app.use(produitRouter);
app.use(commandeRouter);
app.use(clientRouter);
app.use(panierpriseRouter);
app.use(paiement);
app.use(mail);
app.use(forgotpassword);
// app.use(billetRouter);
// app.use(incriptionRouter);
// app.use(authRouter);
// Lancement du serveur

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
