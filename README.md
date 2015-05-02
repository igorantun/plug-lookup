Node.JS Chat
============
[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/plug-lookup.svg)](https://github.com/IgorAntun/plug-lookup/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/plug-lookup.svg)](https://github.com/IgorAntun/plug-lookup/issues) [![Current Version](https://img.shields.io/badge/version-0.2.5-green.svg)](https://github.com/IgorAntun/plug-lookup)

A node.js utility to add a plug.dj user lookup integration on your Slack team.

![Plug Lookup Preview](http://i.imgur.com/cEN8oyC.png)


## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

#### Slack
On `config.json`, do the following:
 - Go to your [Slack Integrations](slack.com/services/new) page and set up a *Bot*
 - Now go back to `config.json` and replace *your-slack-token* with your Bot Token
 - Replace *your-slack-channel* with the *Channel ID* of the Slack channel you're going to use

#### plug.dj
 - Go to plug.dj and open your browser's *Developer Console* (usually <kbd>F12</kbd>)
 - Go to the Developer Console's **"Network"** tab
 - Do something on plug.dj such as opening the ban list of a room
 - You should see the request for it on Developer Console's **"Network"** tab
 - Click it and search for **"Cookie"** inside **"Request Headers"**, and copy its *session=[..your session cookie..]* (it should be the last thing on Cookie)
 - Go back to `config.json` and replace *your-plug.dj-session-cookie* with it


## Usage
 - Run  `node main.js` on your clone root directory to start the application.
 - Once the utility is running, invite your Slack bot to the channels you want him to work on.
 - Use `!lookup [userid]` in a channel the bot is on and he'll reply with the user details.


## Notes
If you logout from your account on plug.dj (the account you got the session cookie from) by clicking the Logout button, your cookie will be invalidated by plug.dj and this utility won't work until you log in back.

Notice your account can be offline (disconnected), it just can't be logged out)
