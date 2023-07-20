const express = require('express');
const router = express.Router();

router.get('/activacion', (req, res) => {
    res.render('activacion/index');
});

module.exports = router;