let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let ArticleSourceSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    rss_url: {
        type: String,
        default: '',
        required: true
    },
    icon_url: {
        type: String,
        default: '',
        required: true
    },
});

module.exports = mongoose.model('MArticleSource', ArticleSourceSchema);