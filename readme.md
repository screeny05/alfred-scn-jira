# alfred-scn-jira
> Alfred Jira Module

<p align="center">
  <img src="https://cdn.rawgit.com/screeny05/alfred-scn-jira/master/screenshot.jpg" width="580" height="382" alt="screenshot"/>
</p>



## Install

```
$ npm install -g alfred-scn-jira
```

Or [download the latest release as workflow-file](https://github.com/screeny05/alfred-scn-jira/releases/latest).

*Requires [Node.js](https://nodejs.org) 6.5+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

If you want to use this workflow on an older node-version, please open an issue.


## Overview

This workflow adds following features to Alfred:
* `jira <query>` - Search jira within alfred (Issues & Projects)
* `jitest` - Test your set credentials
* `jiconfig <server> <user>` - Set credentials for accessing your jira-instance
* A fallback search


## Usage

First, be sure that the node-executable is within your `$PATH`.

In order to use any commands you first have to configure your credentials.
This can be done by using the provided `jiconfig` command. You have to supply the
server as a hostname or url and your username. Afterwards there will be a password-dialog
storing your credentials within the macOS Keychain.

If you want to use the fallback-search, you have to config it in your Alfred settings:

`Features` > `Default Results` > `Setup fallback results`


## License

MIT © [Sebastian Langer](https://scn.cx)
