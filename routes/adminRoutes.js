var express = require('express'),
    Blog = require("../models/blog"),
    router = express.Router();
var multer = require('multer');

const isLogged = require('../middleware/loginCheck');



const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get("/admin", isLogged, (req, res) => {

    res.render("admin");

});



router.get("/admin/addBlog", isLogged, (req, res) => {
    res.render("addBlog");
})

router.post('/admin/addBlog', isLogged, upload.single('image'), (req, res) => {

    const blog = new Blog({
        _id: uuidv4(),
        title: req.body.title,
        body: req.body.text,
        imageURL: req.file.originalname
    });
    blog.save()
        .then((result) => { res.redirect("/blogs") })
        .catch((err) => console.log(err))

});


router.get("/admin/deleteBlog", isLogged, (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('deleteBlog', { blogs: result }))
        .catch(err => console.log(err));


});

router.get("/admin/deleteBlog/:id", isLogged, (req, res) => {

    Blog.findByIdAndDelete(req.params.id)
        .then(result => res.redirect("/admin/deleteBlog"))
        .catch(err => console.log(err));


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




module.exports = router;