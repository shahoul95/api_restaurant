var axios = require("axios").default;
require('dotenv').config()

async function generateToken() {

  var data = {
    "client_id": process.env.CLIENT_ID || "bPntri4HDuA3ROXwEnsKh1fVmo3guRLX",
    "client_secret": process.env.CLIENT_SECRET || "zszRiD3V9OqON-JP-rKO72YFauZ6zbIpUj659Ef2VSwTdyIPavM-BWWFvtGkpL2F",
    "audience": process.env.AUDIENCE || "http://localhost:8080/getorder" ,
    "grant_type": process.env.GRANT_TYPE || "client_credentials"
  };
  var options = {
    method: 'POST',
    url: 'https://dev-my9spvf3.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify(data)


  };
  var a = axios.request(options).then(function (response) {
    return response;
  }).catch(function (error) {
    console.error(error);
  });
  return a;
}
module.exports.generateToken = generateToken;
