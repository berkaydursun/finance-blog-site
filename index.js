const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const Blog = require('./models/blog');

const app = express();
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const indexRoutes = require('./routes/indexRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');

const isLogged = require('./middleware/loginCheck');

const session = require('express-session');
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
const dbURI = "mongodb+srv://berkay:berkaydursun08@cluster0.onitz.mongodb.net/finance-blog?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI || dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));


app.use(express.static(path.join(__dirname, '/public')));


app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(blogRoutes);
app.use("/admin", isLogged, adminRoutes);
app.use(indexRoutes);
app.use(contactUsRoutes);