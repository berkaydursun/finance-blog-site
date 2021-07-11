const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');

const Schema = mongoose.Schema;


const blogSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
    },
    imageURL: {
        type: String
    }
}, { timestamps: true });


blogSchema.pre('validate', function(next) {
    //check if there is a description
    if (this.body) {
        this.body = htmlPurify.sanitize(this.body);
        this.snippet = stripHtml(this.body.substring(0, 200));
    }

    next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;