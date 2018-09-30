let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const image_url_default = 'https://raw.githubusercontent.com/snwh/paper-icon-theme/master/Paper/512x512/apps/preferences-color.png';

let ArticleSchema = new Schema({
    author: {type: String, default: ''},
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    created: {type: Date, default: Date.now}
    //thumb: {type: String, default: image_url_default}
});

module.exports = mongoose.model('MArticle', ArticleSchema);