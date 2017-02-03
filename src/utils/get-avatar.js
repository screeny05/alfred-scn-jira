const fs = require('fs');
const path = require('path');
const alfy = require('alfy');
const pify = require('pify');
const farmhash = require('farmhash');
const isSvg = require('is-svg');
let svgToImg = null;

const plainRequest = require('./jira-request').plainRequest;

const server = alfy.config.get('server');

const getAvatarUrl = str => str.indexOf(server) === -1 ? `https://${server}${str}` : str;


const writeAvatarFile = (url, filePath, content) => pify(fs.writeFile)(filePath, content, 'binary').then(() => {
    alfy.cache.set(`avatar:${url}`, filePath);
    return filePath;
});

module.exports = url => {
    url = getAvatarUrl(url);

    let avatarPath = alfy.cache.get(`avatar:${url}`);

    if(avatarPath && fs.existsSync(avatarPath)){
        return avatarPath;
    }

    return plainRequest({
        uri: url,
        encoding: null
    }).then(content => {
        const filePath = path.resolve(alfy.alfred.data, 'avatar-' + farmhash.hash64(url));
        if(isSvg(content)){
            // lazy load svg2img, as it's ultra-slow
            svgToImg = svgToImg ? svgToImg : svgToImg = require('svg2img');
            return pify(svgToImg)(content, {
                format: 'png',
                width: 128,
                height: 128
            }).then(content => writeAvatarFile(url, filePath, content));
        }

        return writeAvatarFile(url, filePath, content);
    });
};
