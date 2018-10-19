let MArticleSource = require('../models/article_source');
let ArticleLoader = require('../utils/article_loader');

const OnPostCreate = async function (req, res) {

    //let source_data = req.body.params.source;
    let source_data = req.body;

    let source = null;
    try {
        source = new MArticleSource({
            name: source_data.name,
            rss_url: source_data.rss_url
        });
    } catch (ex) {
        res.send({
            success: false,
            message: "Cannot create Article source"
        });
        return;
    }//try


    let source_existed = null;
    try {
        source_existed = await MArticleSource.findOne({name: source.name}).lean();
    } catch (ex) {
        res.send({
            success: false,
            message: ex
        });
        return;
    }//try

    if (source_existed !== null) {
        res.json({
            success: false,
            message: 'Article Source already exists!'
        });
        return;
    }//if

    try {
        await MArticleSource.create(source);
    } catch (ex) {
        res.send({
            success: false,
            message: ex.message
        });
        return;
    }//try

    res.json({
        success: true,
        message: 'Article Source has been created!'
    });
};//OnPostCreate


const OnPostUpdate = async function (req, res) {

    let source_data = req.body;

    try {
        await MArticleSource.updateOne({
            name: source_data.name
        }, source_data);

    } catch (ex) {
        res.send({
            success: false,
            message: ex.message
        });
        return;
    }//try

    res.json({
        success: true,
        message: 'Article Source has been updated!'
    });

};//OnPostUpdate


const OnPostRemove = async function (req, res) {

    let name = req.body.name;

    try {
        await MArticleSource.deleteOne({name: name});
    } catch (ex) {
        res.send({
            success: false,
            message: ex.message
        });
        return;
    }//try

    res.json({
        success: true,
        message: 'Article has been removed!'
    });

};//OnPostRemove


const OnPostLoadArticles = async function (req, res) {

    let article_loader = new ArticleLoader();

    try {
        await article_loader.LoadNewArticles();
    } catch (ex) {
        res.json({
            success: false,
            message: ex.message
        });
    }//try add new articles

    res.json({
        success: true,
        message: 'New Article has been added!'
    });

};//OnPostRemove


const OnGetArticleSources = async function (req, res) {

    const OnArticesGet = function (err, articles) {
        if (err) {
            res.send(err);
            return;
        }//if

        res.json(articles);
    };//OnArticesGet

    MArticleSource.find({}, OnArticesGet).limit(40);

};//OnPostRemove


const API_article_source = function (app, express) {

    let api = express.Router();

    api.post('/article_source_create', OnPostCreate);
    api.post('/article_source_update', OnPostUpdate);
    api.post('/article_source_remove', OnPostRemove);

    api.get('/article_sources', OnGetArticleSources);

    api.post('/article_source_load_articles', OnPostLoadArticles);

    return api;
};//ArticleCreate


module.exports = API_article_source;
//GET example localhost:3000/api_article_source/article_source_create

/*

    let source = null;
    try {
        source = await MArticleSource.findOne({}).lean();
    } catch (ex) {
        res.send({
            success: false,
            message: ex
        });
        return;
    }//try

    let feed = await GetRSSArticles(source.rss_url);

    let article, uid;
    for (let item of feed.items) {

        uid = GetHash(item.link);

        article = new MArticle({
            uid: uid,
            title: item.title,
            author: item.author,
            created: item.isoDate,
            content: item.contentSnippet,
            url: item.link,
            source: source.name,
        });

        try {
            await MArticle.create(article);
        } catch (ex) {
            res.send({
                success: false,
                message: ex.message
            });
            return;
        }//try
    }//for

 */