let MArticle = require('../models/article');


const OnPostArticleCreate = function (req, res) {

    let article_data = req.body.params.article;

    let article = new MArticle({
        author: article_data.author,
        content: article_data.content,
        title: article_data.title,
        created: article_data.created,
    });

    const onCreate = function (err) {

        if (err) {
            res.send(err);
            return;
        }//if err

        res.json({
            success: true,
            message: 'Article has been created!'
        });
    };//onCreate

    MArticle.create(article, onCreate);
};//OnPostArticleCreate


const OnPostArticleUpdate = function (req, res) {

    let article_data = req.body.params.article;

    const onUpdate = function (err, result) {
        if (err) {
            res.send(err);
            return;
        }//if err
        res.json({
            success: true,
            message: 'Article has been edited!'
        });
    };//onUpdate

    MArticle.updateOne({_id: article_data._id}, article_data, onUpdate);
};//OnPostArticleCreate


const OnPostArticleRemove = function (req, res) {

    let article_id_to_remove = req.body.params.article_id_to_remove;

    const onRemove = function (err, result) {

        if (err) {
            res.send(err);
            return;
        }//if err
        res.json({
            success: true,
            message: 'Article has been removed!'
        });
    };//onUpdate

    MArticle.remove({_id: article_id_to_remove}, onRemove);
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
    api.post('/article_update', OnPostArticleUpdate);
    api.post('/article_remove', OnPostArticleRemove);
    api.get('/articles', OnGetArticles);
    api.get('/check_root', OnGetRoot);

    return api;
};//ArticleCreate


module.exports = API;
//GET example localhost:3000/api/users