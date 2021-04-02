const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({ apiKey: process.env.APIKEYMAILGUN, domain: DOMAIN });
require('dotenv').config()
const Sendreceive = {

    Sendreceives: async (req, res) => {
        const data = {
            from: req.body.from,
            to: process.env.MAIL_USERNAME,
            subject: req.body.subject,
            text: req.body.text
        };
        try{
            mg.messages().send(data).then(body=> res.status(200).json({body, status :"success" })).catch(error=> {res.status(500).json(error)})
        }catch(error){
            res.status(500).json(error);
        }
       

    }

}
module.exports = Sendreceive;
