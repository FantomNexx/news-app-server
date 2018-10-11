let MArticle = require('../models/article');
let MArticleSource = require('../models/article_source');
let Parser = require('rss-parser');
let parser = new Parser();

class ArticleLoader {

    constructor() {
        this.source_rules = {
            'wired': {
                'author': 'creator'
            }
        }
    }//constructor


    async LoadNewArticles() {

        return new Promise(async (resolve, reject) => {

            let sources;

            try {
                sources = await this.GetSources();
            } catch (ex) {
                reject(ex);
            }//tru get sources


            let articles_data;
            try {
                articles_data = await this.GetArticlesData(sources);
            } catch (ex) {
                reject(ex);
            }//try get articles data


            try {
                await this.AddArticlesToDB(articles_data);
            } catch (ex) {
                reject(ex);
            }//try add articles to db


            resolve({
                success: true,
                message: 'Articles added!'
            });

        });//promise
    }//LoadNewArticles

    async GetSources() {
        return new Promise(async (resolve, reject) => {

            let sources = [];
            try {
                sources = await MArticleSource.find({}).lean();
            } catch (ex) {
                reject(ex);
            }//try

            resolve(sources);

        });//Promise
    }//GetSources

    async GetArticlesData(sources) {

        return new Promise(async (resolve, reject) => {

            if (sources.length === 0) {
                return;
            }// if no soruces

            let articles_data_combined = [];
            let articles_data;
            let article_data;

            for (let source of sources) {

                let feed_items = await
                    ArticleLoader.GetFeedItems(source.rss_url);

                if (feed_items.length === 0) {
                    break;
                }//if

                articles_data = [];
                let is_item_exists;
                let uid;

                for (let item of feed_items) {

                    uid = ArticleLoader.GetArticleUID(item.link);

                    try {
                        is_item_exists = await this.CheckIfExists(uid);
                    } catch (ex) {
                        reject(ex);
                    }//try

                    if (is_item_exists) {
                        break;
                    }//if


                    article_data = this.GetArticleData(uid, source, item);

                    articles_data.push(article_data);
                }//for feed_items

                articles_data_combined =
                    [...articles_data_combined, ...articles_data];
            }//for around sources

            resolve(articles_data_combined);

        });//Promise
    }//GetArticlesData

    async CheckIfExists(uid) {

        return new Promise(async (resolve, reject) => {

            let is_item_exists = false;

            let article;

            try {
                article = await MArticle.findOne({uid: uid}).lean();
            } catch (ex) {
                reject(ex);
            }

            if (article !== null) {
                is_item_exists = true;
            }//if

            resolve(is_item_exists);
        });//Promise
    }//CheckIfExists


    GetArticleData(uid, source, item) {

        let article_data = {
            uid: uid,
            title: item.title,
            author: item.author,
            created: item.isoDate,
            content: item.contentSnippet,
            url: item.link,
            source: source.name,
        };


        let rules_set = this.source_rules[source.name];

        if (rules_set !== undefined) {
            for (let key in rules_set) {
                let key_alt = rules_set[key];
                article_data[key] = item[key_alt]
            }//for
        }//if

        article_data = new MArticle(article_data);

        return article_data;

    }//CheckIfExists


    async AddArticlesToDB(articles_data) {

        return new Promise(async (resolve, reject) => {

            let result = null;

            for (let article_data of articles_data) {

                try {
                    result = await MArticle.create(article_data);
                } catch (ex) {
                    reject(ex);
                }//try
            }//for

            resolve({
                success: true
            });

        });//Promise
    }//AddArticlesToDB


    static async GetFeedItems(rss_url) {

        return new Promise(async (resolve, reject) => {

            let feed = [];

            try {
                feed = await parser.parseURL(rss_url);
            } catch (ex) {
                reject(ex);
            }//try

            if (!feed.items) {
                resolve([]);
            }//if

            resolve(feed.items);

        });//Promise
    };//GetFeedItems

    static GetArticleUID(str, asString, seed) {
        /*original func name hashFnv32a: */
        /*jshint bitwise:false */
        let i, l,
            hval = (seed === undefined) ? 0x811c9dc5 : seed;

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if (asString) {
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;
    };

}//class ArticleLoader


module.exports = ArticleLoader;

/*

return new Promise(async (resolve, reject) => {
});//Promise

 */