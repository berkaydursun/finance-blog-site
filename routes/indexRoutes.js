var express = require('express'),
    router = express.Router();





router.get("/", (req, res) => {

    res.render("main");

});

router.get("/signin", (req, res) => {

    res.render("signin");

});

router.post('/signin', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {

        if (username === "admin" && password === "davlumbaz123") {

            req.session.isLogged = true;
            res.redirect('/admin');
        } else {
            res.redirect('/');

        }
    } else {
        res.redirect('/');

    }


});



router.get("/termsofservice", (req, res) => {

    res.render("termsofservice");

});


router.get("/contactUs", (req, res) => {

    res.render("contactUs");

});

module.exports = router;