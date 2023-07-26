const express = require('express');
const router = express.Router();

router.get('/public/files', async (req, res) => {
    res.render('index');
});

module.exports = router;