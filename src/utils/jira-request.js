const alfy = require('alfy');
const rp = require('request-promise-native');

const getCredentials = require('./get-credentials');

const server = alfy.config.get('server');

const credentialRequest = options => getCredentials().then(credentials => {
    options = Object.assign({
        method: 'GET',
        auth: {
            user: credentials.username,
            pass: credentials.password
        },
        json: true
    }, options);

    return rp(options);
});

module.exports = (endpoint, query) => {
    return credentialRequest({
        uri: `https://${server}/rest/${endpoint}`,
        qs: query,
    });
};

module.exports.plainRequest = credentialRequest;
