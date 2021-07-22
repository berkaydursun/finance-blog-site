const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const { JSDOM } = require("jsdom");
const htmlPurify = domPurifier(new JSDOM().window);

const stripHtml = require('string-strip-html');

const Schema = mongoose.Schema;


const message = new Schema({
    _id: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
    }

}, { timestamps: true });


message.pre('validate', function(next) {
    //check if there is a description
    if (this.body) {
        this.body = htmlPurify.sanitize(this.body);
        this.snippet = stripHtml(this.body.substring(0, 200));
    }

    next();
});

const Message = mongoose.model('Message', message);

module.exports = Message;