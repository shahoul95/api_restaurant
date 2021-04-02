const mongoose = require("mongoose");


const paiementSchema = new mongoose.Schema({
  montantotal: {
    type: Number,
    required: true
  },

  commandeid: {
    type: mongoose.Types.ObjectId,
    ref: 'Commande',
    required: true

  }
 
 
});

const Paiement= mongoose.model('Paiement', paiementSchema);
module.exports =Paiement;