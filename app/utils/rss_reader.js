let Parser = require('rss-parser');
let parser = new Parser();

const GetRSSArticles = async function (rss_url) {

    let feed_items = [];

    try {
        feed_items = await parser.parseURL(rss_url);
    } catch (ex) {
        console.log('GetFeedItems: ', ex.message);
    }//try

    return feed_items;

};//GetFeedItems

module.exports = GetRSSArticles;



/*

"dependencies": {
"rss-parser": "^3.5.2"
}

feed.items.forEach(item => {
console.log(item.title);
});

*/