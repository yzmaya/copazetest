const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const transporter = require("./lib/mailer")

const { database } = require('./keys');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use(require('./routes/salud'));
app.use(require('./routes/activacion'));
app.use(require('./routes/arteYcultura'));
app.use(require('./routes/gestionAmbiental'));
app.use(require('./routes/eSolicitud'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

//Tranporter Nodemailer
app.post("/api/auth/login/:email/code", async function(req, res){
  const {email} = req.params
  const result = await transporter.sendMail({
    from:"karen.jasso@sems.gob.mx",
    to:email,
    subject: "prueba",
    body: "Cuerp del mensaje de prueba",
  })
  console.log({result})
  res.status(200).json({ok:true, message:"mensaje enviado con éxito"})
})

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});
