const express = require('express');
const router = express.Router();

router.get('/arteYcultura', (req, res) => {
    res.render('arte_y_cultura/index');
});

module.exports = router;