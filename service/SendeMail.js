var nodemailer = require('nodemailer');
require("dotenv").config();



async function sendMails(produit, total) {


  let produits = produit.map(element => {

    return element;
  });


  let product = [produits[0][0], { email: produits[1].mail }];
  let sendmail = product.map(x => { return x })
  let emailclients = sendmail[1].email;
  let adresse = produits[0][0].commande.adresse;
  let telephone = produits[0][0].commande.telephone;
  let tab = product[0].produit;
  let commandeclientnom = produits[0][0].commande.nom;
  let commandeclientprenom = produits[0][0].commande.prenom;
  let results = tab.map(x => { return '<li>' + "Nom :" + x.nom + '</li><li>' + "Prix :" + x.prix + "€" + "<li>" + "Quantité :" + `${x.quantite === null || x.quantite === undefined || x.quantite === isNaN || x.quantite === "Nan" ? "1" : x.quantite}` + "</li>"; });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME ,
      pass: process.env.MAIL_PASSWORD ,
      clientId: process.env.OAUTH_CLIENTID ,
      clientSecret: process.env.OAUTH_CLIENT_SECRET ,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN 

    }
  });

  var mailOptions = {
    from: process.env.MAIL_USERNAME || "shahoul95@gmail.com",
    to: emailclients,
    subject: 'Sapori Di Casa',
    html: "<h3>Bonjour :  " + commandeclientnom + " " + commandeclientprenom + "   </h3> <h5>Adresse postale : " + adresse + "</h5>  <h5>Téléphone: +33" + telephone + "</h5>     <p>Commande: </p><ul>" + results + "</ul><hr><h3> Montant total : " + total + "€" + "</h3>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return info.accepted;
    }

  });

  return 1;





}


module.exports.sendMails = sendMails;