const express = require('express');
const router = express.Router();

router.get('/gestionAmbiental', (req, res) => {
    res.render('gestionAmbiental/index');
});

module.exports = router;