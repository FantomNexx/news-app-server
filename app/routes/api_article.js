let MArticle = require('../models/article');

const OnPostCreate = function (req, res) {

    let article_data = req.body.params.article;

    let article = new MArticle({
        author: article_data.author,
        content: article_data.content,
        title: article_data.title,
        created: article_data.created,
        source: article_data.source,
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
};//OnPostCreate


const OnPostUpdate = function (req, res) {

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
};//OnPostCreate


const OnPostRemove = function (req, res) {

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

    MArticle.deleteOne({_id: article_id_to_remove}, onRemove);
};//OnPostCreate


const OnGetArticles = function (req, res) {

    const OnArticlesFind = function (err, articles) {
        if (err) {
            res.send(err);
            return;
        }//if

        res.json(articles);
    };//OnUserFind

    MArticle.find({}, OnArticlesFind).sort({'created': -1}).limit(40);
};//OnGetArticles


const API_article = function (app, express) {

    let api = express.Router();

    api.post('/article_create', OnPostCreate);
    api.post('/article_update', OnPostUpdate);
    api.post('/article_remove', OnPostRemove);

    api.get('/articles', OnGetArticles);

    return api;
};//ArticleCreate


module.exports = API_article;
//GET example localhost:3000/api_article/articles