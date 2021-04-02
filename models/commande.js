const mongoose = require("mongoose");


const commandeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true
  },
  adresse: {
    type: Object,
    required: true,
  },

  client: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: false

  },


});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
