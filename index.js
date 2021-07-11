const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Blog = require('./models/blog');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const indexRoutes = require('./routes/indexRoutes');

const PORT = process.env.PORT || 3000;


// Connect to MongoDB
const dbURI = "mongodb+srv://berkay:berkaydursun08@cluster0.onitz.mongodb.net/finance-blog?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '../public/'));

app.use(blogRoutes);
app.use(adminRoutes);
app.use(indexRoutes);