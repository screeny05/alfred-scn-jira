const alfy = require('alfy');
const request = require('./utils/jira-request');

const username = alfy.config.get('username');

request('api/2/myself')
    .then(user => console.log(`Success. Welcome, ${user.displayName}`))
    .catch(err => console.log(`Error: ${err.message}`));
