'use strict';
// configure nodemailer transporter
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSPORTER_PORT,
  auth: {
    user: process.env.TRANSPORTER_EMAIL_ADDRESS,
    pass: process.env.TRANSPORTER_PASSWORD
  }
});

transporter.verify().then(console.log).catch(console.error);

module.exports = transporter;
