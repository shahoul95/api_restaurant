const Client = require('../models/client');
const argon2 = require("argon2");
const generatetoken = require('../service/GenerateToken');
const ClientController = {

    CreateUser: async (req, res) => {
        const { nom, prenom, adresse, mail, password, telephone } = req.body
        try {

            const newUser = new Client({
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                telephone: telephone,
                mail: mail,
                password: password
            });
            const data = await newUser.save();
            res.status(201).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send("Erreur lors de l'ajout du compte");
        }
    },
    Login: async (req, res) => {
        try {
            const { mail, password } = req.body;
            const user = await Client.findOne({ mail });

            if (!user) {

                return res
                    .status(401)
                    .send("Erreur de mot de passe et/ou de nom d'utilisateur");
            }
            const match = await argon2.verify(user.password, password);
            if (!match) {
                return res.status(401).send("Erreur de mot de passe et/ou d'utilisateur");
            }

            generatetoken.generateToken().then(response => {
                console.log(response.data.access_token);
                const user_id = {
                    id: user._id,
                    user: true,
                    token: response.data.access_token
                }
                res.status(200).json(user_id);
            });




        } catch {
            res.status(500).send("Erreur lors du login");
        }
    },
    Profile: async (req, res) => {
        const id = req.params.id;
        await Client.findById(id)
            .exec()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send("Erreur/ id n'existe pas");
            });
    },
    ProfileUpdate: async (req, res) => {
        try {
            const { id } = req.params;
            const acceptedFieldToUpdate = [
                "nom",
                "prenom",
                "adresse",
                "telephone",
                "mail",
                "password"
            ];
            const keys = Object.keys(req.body).filter((key) =>


                acceptedFieldToUpdate.includes(key)

            );

            const fieldsToUpdate = {};
            keys.map((key) => {


                fieldsToUpdate[key] = req.body[key]

            }

            );
            const hash = await argon2.hash(fieldsToUpdate.password);
            const fieldToUpdates = { mail: fieldsToUpdate.mail, telephone: fieldsToUpdate.telephone, password: hash };
            console.log(fieldToUpdates)
            console.log(id);

            const data = await Client.findByIdAndUpdate(id, fieldToUpdates, {
                new: true,

            });
            res.status(200).json({ success: true, data });


        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = ClientController;