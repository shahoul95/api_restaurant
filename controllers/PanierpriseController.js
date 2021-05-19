const Panierprise = require('../models/panierprise');


const PanierpriseController = {

    Getallbasket: async (req, res) => {
    await Panierprise.find().populate('commande')
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  getAllBasketId: async (req, res) => {
    const { id } = req.params;
    let result = await Panierprise.find({ commande: id }).populate('commande')
      .then((data) => {
        console.log(data);
        res.send(data);

      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });

  },
  getAllBasketProductClient: async (req, res) => {
    const { id } = req.params;
    let result = await Panierprise.find({ clientid: id }).populate('clientid')
      .then((data) => {
        console.log(data);
        res.send(data);

      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });

  },
  NewCreateBasket: async (req, res) => {

    try {

      const newOrder = new Panierprise({
        produit: req.body.produit,
        commande: req.body.commande,
        clientid: req.body.clientid

      });
      const data = await newOrder.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'ajout du produit");
    }
  },
};

module.exports = PanierpriseController;