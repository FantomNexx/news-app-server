let MArticle = require('../models/article');


const OnPostArticleCreate = function (req, res) {

    console.log('OnPostArticleCreate');

    let data = req.body.data;

    let article = new MArticle({
        author: data.author,
        content: data.content,
        title: data.title
    });

    const OnSave = function (err) {

        if (err) {
            res.send(err);
            return;
        }//if err

        res.json({
            success: true,
            message: 'Article has been created!'
        });
    };//OnSave

    article.save(OnSave);
};//OnPostArticleCreate


const OnGetArticles = function (req, res) {

    const OnArticlesFind = function (err, articles) {
        if (err) {
            res.send(err);
            return;
        }//if
        res.json(articles);
    };//OnUserFind

    MArticle.find({}, OnArticlesFind);
};//OnGetArticles

const OnGetRoot = function (req, res) {
    const result = {
        success: true,
        message: 'Yep, its root!'
    };
    res.json(result);
};//OnGetRoot


const API = function (app, express) {

    let api = express.Router();

    api.post('/article_create', OnPostArticleCreate);
    api.get('/articles', OnGetArticles);
    api.get('/check_root', OnGetRoot);

    return api;
};//ArticleCreate


module.exports = API;
//GET example localhost:3000/api/users