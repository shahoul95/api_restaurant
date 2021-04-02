const Produit = require("../models/produit");
const cloudinary = require('../utils/cloudinary');

const ProductController = {

  getAllProduct: async (req, res) => {
    await Produit.find()
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  getAllProductCategory: async (req, res) => {
    const { categorie } = req.params;
    await Produit.find({ categorie: categorie })
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },

  CreateProduct: async (req, res) => {

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    console.log(req.file.path);
    try {

      const newProduit = new Produit({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        categorie: req.body.categorie,
        photo: result.secure_url,
        cloudinary_id: result.public_id

      });
      const data = await newProduit.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'ajout du produit");
    }
  },



};


module.exports = ProductController;
