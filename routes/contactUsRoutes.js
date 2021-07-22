var express = require('express'),
    Message = require("../models/message"),
    router = express.Router();

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');


router.post('/contactUs', (req, res) => {

    const message = new Message({
        _id: uuidv4(),
        body: req.body.text

    });
    message.save()
        .then((result) => { res.redirect("/contactUs") })
        .catch((err) => console.log(err))

});





module.exports = router;