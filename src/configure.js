const alfy = require('alfy');
const clortho = require('clortho');
const isUrl = require('is-url');
const URL = require('url-parse');

const args = process.argv[2].split(' ', 2);

if(args.length !== 2){
    console.info('Server-Hostname and Username are required.');
    process.exit(0);
}

let server = args[0].trim();
const username = args[1].trim();

if(isUrl(server)){
    const url = new URL(server);
    server = url.host
}

clortho({
    service: 'scn-jira',
    message: `Please enter JIRA-Credentials for ${username} at ${server}`,
    username: username,
    cli: false,
    refresh: true
}).then(credentials => {
    alfy.config.set('server', server);
    alfy.config.set('username', username);
    console.info('Successfully saved credentials');
}).catch(err => {
    process.exit(0);
});
