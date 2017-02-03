const alfy = require('alfy');

const formatUsearch = require('./utils/format-usearch');
const request = require('./utils/jira-request');

const query = process.argv[2];
const cacheId = `search:${query}`;
const cachedIssues = alfy.cache.get(cacheId);

if(cachedIssues){
    formatUsearch(cachedIssues, query);
} else {
    request('usearch/1/search', { q: query }).then(res => {
        if(res.some(qsItem => qsItem.items.length > 0)){
            alfy.cache.set(cacheId, res);
        }
        return formatUsearch(res, query);
    });
}
