var express = require('express'),
    Blog = require("../models/blog"),
    router = express.Router();
var multer = require('multer');
const path = require('path');




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


router.get("/", (req, res) => {

    res.render("admin");

});



router.get("/addBlog", (req, res) => {
    router.use(express.static(path.join(__dirname, '/public/')));
    res.render("addBlog");
})

router.post('/addBlog', upload.single('image'), (req, res) => {

    const blog = new Blog({
        _id: uuidv4(),
        title: req.body.title,
        body: req.body.text,
        imageURL: req.file.originalname
    });
    blog.save()
        .then((result) => { res.redirect("/admin") })
        .catch((err) => console.log(err))

});


router.get("/deleteBlog", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('deleteBlog', { blogs: result }))
        .catch(err => console.log(err));


});

router.delete("/deleteBlog/:id", (req, res) => {

    Blog.findByIdAndDelete(req.params.id)
        .then(result => res.redirect("/admin"))
        .catch(err => console.log(err));


});







module.exports = router;