const express = require('express');
const router = express.Router();

router.get('/copaze', (req, res) => {
    res.render('copaze/index');
});

module.exports = router;