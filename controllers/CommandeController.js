const Commande = require('../models/commande');

const CommandeController = {
  getAllCommande: async (req, res) => {
    await Commande.find().populate('client')

      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  getAllCommandeId: async (req, res) => {
    const { id } = req.params;
    await Commande.find({ client: id }).populate('client')

      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  CreateOrder: async (req, res) => {
    const { nom, prenom, telephone, adresse} = req.body.client;
    const { id } = req.body.user;
    try {

      const newOrder = new Commande({
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        adresse: adresse,
        client: id,

      });
      const data = await newOrder.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'ajout du produit");
    }
  },
};

module.exports = CommandeController;