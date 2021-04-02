const mongoose = require("mongoose");


const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  description : {
     type : Array,
     required : false,
  },
  prix : {
    type : Number,
    required : true,
 },
 categorie : {
 type : String,
 required : true,
 },
 photo : {
  type : String,
  required : true

 },
 cloudinary_id : {
     type : String,
     required : true
 }

});

const Produit = mongoose.model('Produit', produitSchema);
module.exports = Produit;
