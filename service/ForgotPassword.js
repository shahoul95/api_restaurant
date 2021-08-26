const accountSid = process.env.TWILIO_ACCOUNT_SID || "ACafae9516d785e905bfb7f0e7c7ca368a";
const authToken = process.env.TWILIO_AUTH_TOKEN || "6c140e401687d883f9f776f2e678efdb";
const client = require('twilio')(accountSid, authToken);
const argon2 = require("argon2");
const Client = require('../models/client');
require('dotenv').config()
const ForgotPassword = {

    SendNumber: async (req, res) => {
        const { telephone } = req.body;
        try {
            let telephones = "+33" + telephone;
            client.verify.services('VA97afd16da7f9756c070a291b27962706')
                .verifications
                .create({ to: telephones, channel: 'sms' })
                .then(verification => res.status(200).send(verification.status));
        } catch (error) {
            res.status(500).json(error);
        }


    },
    SendToken: async (req, res) => {
        const { token, telephone } = req.body;
        try {
            console.log(token);

            let telephones = "+33" + telephone
            console.log(telephones);
            client.verify.services('VA97afd16da7f9756c070a291b27962706')
                .verificationChecks
                .create({ to: telephones, code: token })
                .then(verification_check => res.status(200).send(verification_check.status));
        } catch (error) {
            res.status(500).json(error);
        }


    },
   FindUserNumber: async (req, res) => {
        const { telephone } = req.body;
        try {
            console.log(req.body);
            const telephones = await Client.findOne({  telephone });
            if (!telephones) {

                return res.status(401).send({ error: "Aucun utilisateur"});

            } else if (telephones) {

                return res.status(200).json({telephones,success:"success"});
            }
        } catch (error) {
            res.status(500).json(error);
        }


    },
    FindUserChangePassword: async (req, res) => {
    
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
            const fieldToUpdates = { password: hash };
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
}
module.exports = ForgotPassword;
