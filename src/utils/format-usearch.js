const alfy = require('alfy');

const getAvatar = require('./get-avatar');
const getFallbackUrl = require('./get-fallback-url');

const responseToMap = res => {
    const map = {};
    res.forEach(item => {
        map[item.id] = item;
    });
    return map;
};

const orderByFavourite = items => items.sort((a, b) => {
    if((a.favourite && b.favourite) || (!a.favourite && !b.favourite)){
        return 0;
    }

    if(a.favourite){
        return -1;
    }

    if(b.favourite){
        return 1;
    }
});

const formatItems = items => {
    items = orderByFavourite(items);
    return Promise.all(items.map(item => getAvatar(item.avatarUrl))).then(avatars => {
        return items.map((item, i) => ({
            uid: item.title,
            title: item.title,
            subtitle: item.subtitle,
            arg: item.url,
            icon: {
                path: avatars[i]
            }
        }));
    });
};

const getFallback = query => [{
    title: 'No items found',
    subtitle: 'Press <enter> to search...',
    arg: getFallbackUrl(query)
}];

module.exports = (res, query) => {
    const map = responseToMap(res);

    const items = [];
    if(map['quick-search-issues'] && map['quick-search-issues'].items){
        items.push(...map['quick-search-issues'].items);
    }
    if(map['quick-search-projects'] && map['quick-search-projects'].items){
        items.push(...map['quick-search-projects'].items);
    }

    if(items.length === 0){
        return alfy.output(getFallback(query));
    }

    return formatItems(items).then(items => alfy.output(items));
};
