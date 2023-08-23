const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {


  const rows = await pool.query('SELECT * FROM users WHERE username = ? AND contrasena = ?', [username, password]);

  if (rows.length > 0) {

    const user = rows[0];

    
    done(null, user, req.flash('success', 'Welcome ' + user.username));
  } else {
    done(null, false, req.flash('message', 'Correo electronico o contraseña incorrecta'));
  }



}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname, apellido1, apellido2, cct, comision1, comision2, comision3, comision4, comision5, subsistema } = req.body;

  let newUser = {
    fullname,
    apellido1,
    apellido2,
    username,
    contrasena: password, // Aquí estás asignando el valor del campo 'password' del formulario a la columna 'password' en la tabla 'users'
    cct,
    comision1,
    comision2,
    comision3,
    comision4,
    comision5,
    subsistema
  };
  

  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});
