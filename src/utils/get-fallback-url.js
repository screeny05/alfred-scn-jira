const alfy = require('alfy');

module.exports = query => `https://${alfy.config.get('server')}/issues/?jql=text+~+"${encodeURIComponent(query)}"`;
