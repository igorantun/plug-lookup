// Requires
var Slack = require('slack-client');
var request = require('request');

var config = require("./config.json");
var pack = require("./package.json");
var consoleLog = require("./lib/log.js");


// Connection
var slack = new Slack(config.slack.token, true, true);


// Callbacks
slack.on('open', function() {
    consoleLog('start', 'Successfully connected to Slack');
});

slack.on('message', function(message) {
    if(typeof message.text == 'undefined') return;

    var user = slack.getUserByID(message.user);
    var command = message.text.substring(1).split(' ');
    var channel = slack.getChannelGroupOrDMByID(message.channel);

    if(message.text.charAt(0) === '!') {
        switch(command[0].toLowerCase()) {
            case 'lookup':
                var id = message.text.substring(8);

                request({
                    method: 'GET',
                    url: 'https://plug.dj/_/users/' + id,
                    headers: {
                        'cookie': config.app.cookie
                    }
                }, function(error, response, body) {
                    if(!error && response.statusCode == 200) {
                        var body = JSON.parse(body).data[0];

                        if(body.gRole === 5) {
                            body.gRole = 'Admin';
                        } else if(body.gRole === 3) {
                            body.gRole = 'Brand Ambassador'
                        } else {
                            body.gRole = 'User';
                        }

                        if(body.sub === 1) {
                            body.sub = 'Yes';
                        } else {
                            body.sub = 'No';
                        }

                        channel.postMessage({
                            channel: message.channel,
                            attachments: [
                                {
                                    fallback: '',

                                    author_name: '@' + body.username,
                                    author_link: 'https://plug.dj/@/' + body.slug,
                                    author_icon: 'http://i.imgur.com/JxWMq1Z.png',

                                    text: '*Username:* ' + body.username + '\n' +
                                          '*Level:* ' + body.level + '\n' +
                                          '*Slug:* ' + body.slug + '\n' +
                                          '*ID:* ' + body.id + '\n' +
                                          '*Language:* ' + body.language + '\n' +
                                          '*Subscriber:* ' + body.sub + '\n' +
                                          '*Avatar:* ' + body.avatarID + '\n' +
                                          '*Badge:* ' + body.badge + '\n' +
                                          '*Global Role:* ' + body.gRole + '\n',
                                    color: '#009CDD',
                                    mrkdwn_in: ['text']
                                }
                            ],
                            username: 'User Lookup',
                            icon_url: 'http://i.imgur.com/JxWMq1Z.png'
                        });
                    }
                });

                consoleLog('lookup', '[#' + message.channel + ']' + user.name + ': ' + message.text);
            break;

            case 'status':
                consoleLog('info', '[' + user.name + '] - Version: ' + pack.version + ' | Uptime: ' + process.uptime() + 's');
                channel.postMessage({
                    channel: message.channel,
                    text: '<@' + message.user + '> *- Version:* ' + pack.version + ' *| Uptime:* ' + process.uptime() + 's', username: 'status',
                    icon_url: 'http://i.imgur.com/JxWMq1Z.png'
                });
            break;
        }
    }
});


// Intern
slack.login();
