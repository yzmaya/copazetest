const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
<<<<<<< HEAD
        user: "tucorreo",
        pass: "tucontrasena",
=======
        user: "karen.jasso@sems.gob.mx",
        pass: "kar3n29**",
>>>>>>> c655b2f49e9df8a3c6e99d0257711237a7434de4
    }
});

module.exports = transporter;