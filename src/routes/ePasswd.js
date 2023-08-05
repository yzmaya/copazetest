// index.js
const express = require('express');
const router = express.Router();
const transporter = require("../lib/mailer");
const pool = require('../database');

// Ruta para mostrar el formulario de correo electrónico
router.get('/send-email', (req, res) => {
  res.render('partials/recover');
});

// Ruta para procesar el envío del formulario
router.post('/send-email', async (req, res) => {
  const { email } = req.body;

  try {
    // 3. Buscar el correo en la base de datos y obtener los datos necesarios
    const userData = await pool.query('SELECT fullname, contrasena FROM users WHERE username = ?', [email]);
    if (userData.length === 0) {
      // Si el correo no existe, muestra un mensaje de error y redirecciona al formulario
      req.flash('message', 'El correo electrónico no está registrado.');
      res.redirect('/');
    } else {
      // Si el correo existe, enviar el correo con los datos obtenidos
      const { fullname, contrasena } = userData[0];
      await transporter.sendMail({
        from: 'nestor.yzmaya@sems.gob.mx', // Cambia esto por tu correo
        to: email,
        subject: 'Información de usuario',
        text: `Hola ${fullname}, tu contraseña es: ${contrasena}`,
      });

      // Mostrar un mensaje de éxito y redireccionar al formulario
      req.flash('success', 'Correo enviado correctamente.');
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    req.flash('message', 'Ocurrió un error al enviar el correo.');
    res.redirect('/');
  }
});

module.exports = router;
