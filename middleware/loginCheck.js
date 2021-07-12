function isLogged(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect('/signin');


    }
}

module.exports = isLogged;