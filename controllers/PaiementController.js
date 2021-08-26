const Paiement = require('../models/paiement');
const Panierprise = require('../models/panierprise');
const Client = require('../models/client');
const SendEmail = require('../service/SendMail');
const stripe = require('stripe')('sk_test_51HvkmdHP35dfkCD3aFpqlebiIQLZyrkvBMaThdc7e1Yw0hk8wyMDZqhkB02oMYyZHfyCWTSwzHxYB2fOVtXdY71f00KQsx0zFj');
const PaiementController = {
  CreatePayment: async (req, res) => {
    const { montantotal, commandeid, token } = req.body
    try {

      const newPaiement = new Paiement({
        montantotal: montantotal,
        commandeid: commandeid,

      });
      const charge = await stripe.charges.create({
        amount: montantotal * 100,
        currency: 'eur',
        description: 'Sapori Di Casa',
        source: token,
      });
      console.log(charge)
      const data = await newPaiement.save();

      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'ajout du paiement");
    }
  },
  getAllOrderProductId: async (req, res) => {

    const { id, amount } = req.body;
    let resultarray = [];
    console.log(id);
    let result = await Panierprise.find({ commande: id }).populate('commande').then((data) => { return data; }).catch((err) => { return "Erreur lors de la récupération des données" });
    console.log(result);

    if (!result[0].commande.client) {
      return false;


    } else {
      let cliendid = await Client.findById(result[0].commande.client).then((data) => { resultarray = [result, data]; return resultarray; }).catch((err) => { console.log('ok') });
      let maps = cliendid;
      await SendEmail.SendMails(maps, amount).then(response => {

        res.status(200).json(response);
      }).catch((error) => {
        console.error(error);

      });
    }

  }


};

module.exports = PaiementController;