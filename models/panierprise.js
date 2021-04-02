const mongoose = require("mongoose");


const panierpriseSchema = new mongoose.Schema({
  produit: {
    type: Array,
    required: true
  },
  commande: {
    type: mongoose.Types.ObjectId,
    ref: 'Commande',
    required: true

  },
  clientid: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: true

  },
});

const Panierprise = mongoose.model('Panierprise', panierpriseSchema);
module.exports = Panierprise;
