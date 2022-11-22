
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const { EMAIL, PASSWORD ,HOST } = process.env;



const transporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false,
    auth: {
        user: EMAIL ,
        pass: PASSWORD
        
    },
    tls: {
        rejectUnauthorized: false
    }

});





module.exports = transporter;