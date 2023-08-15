const express = require('express'),
      multer = require("multer");
const router = express.Router();
const path = require('path');
const app = express();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

const upload = multer({storage:multer.memoryStorage()});


//multer storagelocal
//app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

router.use(multer({
    storage,
    dest: path.join(__dirname, '../public/uploads'),
    limits: {fileSize: 1000000},//acepta 1 mb
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|pdf|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null,true);
        }
        cb("error: la extension de tu archivo no es correcta")
    }

}).single('archivo1'))

router.get('/add', (req, res) => {
    res.render('agregarMiembros/add');
});



router.post('/add', async (req, res) => {
    try {
        let archivo1 = '';
        if (req.file) {
            archivo1 = req.file.originalname;
        }
        const { tipo, comision, nombre, apellido1, apellido2, cargo, dependencia } = req.body;
        const newLink = {
            tipo,
            comision,
            nombre,
            apellido1,
            apellido2,
            cargo,
            dependencia,
            archivo1,
            user_id: req.user.id
        };
        await pool.query('INSERT INTO links set ?', [newLink]);
        req.flash('success', 'Link Saved Successfully');
        res.redirect('/agregarMiembros/#tabla');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error saving link');
        res.redirect('/agregarMiembros/add');
    }
});






router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('agregarMiembros/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/agregarMiembros/#tabla');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('agregarMiembros/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { tipo, comision, nombre, apellido1, apellido2, cargo, dependencia} = req.body; 
    const newLink = {
        tipo,
        comision,
        nombre,
        apellido1,
        apellido2,
        cargo,
        dependencia
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/agregarMiembros/#tabla');
});

module.exports = router;