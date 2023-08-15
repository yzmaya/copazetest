const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'nestor.yzmaya@sems.gob.mx',
        pass: '',
    }
});

module.exports = transporter;