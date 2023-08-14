const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "karen.jasso@sems.gob.mx",
        pass: "kar3n29**",
    }
});

module.exports = transporter;