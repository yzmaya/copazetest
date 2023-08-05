const express = require('express');
const router = express.Router();

router.get('/enviar-formulario', (req, res) => {
    res.render('partials/modal');
});
  

// También puedes exportar el transporter si necesitas acceder a él desde otros módulos

const transporter = require('../lib/mailer');



function obtenerDireccionCorreo(juntaSeleccionada) {
  switch (juntaSeleccionada) {
    case 'Consejo de paz escolar COPAZE':
      return 'culturadepaz.eje4@sems.gob.mx';
    case 'Salud física y mental':
      return 'salud.eje4@sems.gob.mx';
    case 'Activación física, deporte, alimentación saludable y nutritiva':
      return 'activacionfisica.eje4@sems.gob.mx';
    case 'Arte y cultura':
      return 'arteycultura.eje4@sems.gob.mx';
    case 'Gestión ambiental sostenible y ahorro de recursos':
      return 'ambiental.eje4@sems.gob.mx';
    default:
      // Si no se encuentra una dirección de correo para la junta seleccionada, puedes manejarlo como consideres apropiado.
      return 'correo@ejemplo.com';
  }
}


// Ruta para manejar el envío del formulario
router.post('/enviar-formulario', async (req, res) => {
  try {
    // Obtener el valor seleccionado en el select "junta"
    const juntaSeleccionada = req.body.junta;
    console.log('Junta seleccionada:', juntaSeleccionada); 
    // Obtener la dirección de correo electrónico correspondiente a la junta seleccionada
    const destinatario = obtenerDireccionCorreo(juntaSeleccionada);

    // Obtener los demás datos del formulario
    const cct = req.body.cct;
    const subsistema = req.body.subsistema;
    const nombre = req.body.nombre;
    const apellido1 = req.body.apellido1;
    const apellido2 = req.body.apellido2;
    const email = req.body.email;

    // Crear el cuerpo del mensaje del correo con los datos del formulario
    const mensaje = `
      Información del formulario:

      Junta seleccionada: ${juntaSeleccionada}
      CCT: ${cct}
      Subsistema: ${subsistema}
      Nombre: ${nombre}
      Apellido Paterno: ${apellido1}
      Apellido Materno: ${apellido2}
      Correo electrónico: ${email}
    `;

    // Código para enviar el correo con nodemailer usando el destinatario y el mensaje
    const result = await transporter.sendMail({
      from: "karen.jasso@sems.gob.mx",
      to: juntaSeleccionada,
      subject: "Información de formulario",
      text: mensaje,
    });

    console.log({ result });
    
    //res.status(200).json({ ok: true, message: "Mensaje enviado con éxito" });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al enviar el correo" });
  }
});



module.exports = router;