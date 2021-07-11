var express = require('express'),
    router = express.Router();





router.get("/", (req, res) => {

    res.render("main");

});



router.get("/charts", (req, res) => {

    res.render("charts");

});


module.exports = router;