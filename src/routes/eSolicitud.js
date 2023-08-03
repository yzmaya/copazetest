const express = require('express');
const router = express.Router();

router.get('/modal', (req, res) => {
    res.render('partials/modal');
});



module.exports = router;