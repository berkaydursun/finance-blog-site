var express = require('express'),
    Blog = require("../models/blog"),
    router = express.Router();




router.get("/blogs", (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('blogs', { blogs: result }))
        .catch(err => console.log(err));



});



router.get("/blog/:id", (req, res) => {

    Blog.findById(req.params.id)
        .then(result => {
            res.render('blog', { blog: result });

        })
        .catch(err => console.log(err));


});

module.exports = router;