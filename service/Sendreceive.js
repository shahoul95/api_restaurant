const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN || "sandbox15e5d6cfc12c4302b4c4b3d213062e5b.mailgun.org";
const mg = mailgun({ apiKey: process.env.APIKEYMAILGUN || "784e2fd011222b18c396af264b4427c8-b6d086a8-3b7c9ece", domain: DOMAIN || "sandbox15e5d6cfc12c4302b4c4b3d213062e5b.mailgun.org" });
require('dotenv').config()
const Sendreceive = {

    Sendreceives: async (req, res) => {
        const data = {
            from: req.body.from,
            to: process.env.MAIL_USERNAME || "shahoul95@gmail.com",
            subject: req.body.subject,
            text: req.body.text
        };
        try {
            mg.messages().send(data).then(body => res.status(200).json({ body, status: "success" })).catch(error => { res.status(500).json(error) })
        } catch (error) {
            res.status(500).json(error);
        }


    }

}
module.exports = Sendreceive;
