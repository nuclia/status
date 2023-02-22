# Status

Provide Nuclia current status + feature flagging

## Purpose

This repository allows to broadcast important warning and/or info messages to all dashboard users. Messages are shown at loading time, and only once.

Other purposes:

- Feature flagging: it stores the list of features when want to hide/show on prod.
- Desktop connectors: it stores some pluggable connectors for Desktop app.

## Usage

### Alert message

- Edit [`status.json`](https://github.com/nuclia/status/edit/main/status.json)
- Increment the index (the last message index is stored in the dashboard, so once displayed, it does not appear again unless the index is higher)
- Put the relevant message
- Set `active` to `true`
- Commit the file
- Modify [`index.html`](https://github.com/nuclia/status/edit/main/index.html) to write a message that can be read on the [Status page](https://nuclia.github.io/status/) (to make it easier, we can just comment the existing paragraph and uncomment the other one)

Note: GitHub files have a 10 minutes cache, so users who opened the dashboard less than 10 minutes before the message update will not see the warning.

When the problem is gone, edit again `status.json` and set `active` to `false`, and restore the original message on `index.html`

### Info message

- Edit [`announce.json`](https://github.com/nuclia/status/edit/main/announce.json)
- Increment the index
- Put the relevant message (possibly in HTML)
- Set `active` to `true`
- Commit the file

### Feature flagging

- Edit [`features.json`](https://github.com/nuclia/status/edit/main/features.json)
- Set the features you want, value can be `true`, `false`, or a string
- Commit the file
