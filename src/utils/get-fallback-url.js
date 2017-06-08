const alfy = require('alfy');

module.exports = query => `https://bestit.atlassian.net/secure/QuickSearch.jspa?searchString=${encodeURIComponent(query)}`;
