const mongoose = require("mongoose");
const argon2 = require("argon2");

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  adresse: {
    type: Object,
    required: true,

  },
  telephone: {
    type: Number,
    required: true,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
  },


});
// la fonction pre() avant de sauvegarder dans la base de donnée , il attend le mot de passe du client et apres il va le hasher crypter.
clientSchema.pre("save", async function () {
  try {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  } catch (err) {
    console.log(err);
  }
});
const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
