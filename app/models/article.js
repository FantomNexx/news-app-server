let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    uid: {type: String, default: ''},
    author: {type: String, default: ''},
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    created: {type: String, default: ''},
    source: {type: String, default: ''},
    url: {type: String, default: ''},
});

module.exports = mongoose.model('MArticle', ArticleSchema);
