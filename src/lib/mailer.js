const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "nestor.yzmaya@sems.gob.mx",
        pass: "tameNess1989",
    }
});

module.exports = transporter;