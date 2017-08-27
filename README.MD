# YACB

Yet Another CI Bot.

## Quick start

1. copy or edit `default.config.json`
1. `node main.js` (or `node main.js your.config.json`)


### Endpoint configuration

```
{
    "path": "/some-path",   /* url to listening on -> http://${HOST}:${PORT}/some-path */
    "source": {
        "type": "gitlab",   /* where are messages come from? */
    },
    "destination": {
        "type": "slack",    /* where is resulting message should be send? */,
        "options": {        
            "uri": "slack-incoming-webhook-url",
            "channel": "#channel-name",             /* optional */
            "username": "bot-name"                  /* optional */
        }
    }
}
```

## TODOs
- more destinations = `telegram, ...`
- more sources = `github, bitbucket, ...`


## License
MIT