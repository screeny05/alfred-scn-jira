const alfy = require('alfy');
const clortho = require('clortho');

module.exports = () => clortho({
    service: 'scn-jira',
    username: alfy.config.get('username')
}).then(credentials => ({
    username: credentials.username,
    password: credentials.password,
    server: alfy.config.get('server')
}));
