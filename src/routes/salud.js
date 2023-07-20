const express = require('express');
const router = express.Router();

router.get('/salud', (req, res) => {
    res.render('salud_fisica_y_mental/index');
});

module.exports = router;