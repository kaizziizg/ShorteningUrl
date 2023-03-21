# Shortening URL
a simple ShorteningUrl Service with Node.js,React.js

## WEB API Documentation
> GET `/api/shorten`

    | Parameter | Type   | Description             |
    | --------- | ------ | ----------------------- |
    | url       | string | The URL to be shortened |

    Request:
        Content-Type: application/json

    Response:
        Content-Type: application/json
        success:
            {
                "urlInfo": {
                    "owner": "noOwner",
                    "oriUrl": "https://github.com/kaizziizg/ShorteningUrl",
                    "shortUrl": "https://shorteningurl-eh4konhfta-de.a.run.app/Y6NyY2",
                    "isSuccess": true,
                    "msg": "add URL successed",
                    "clickTime": 0,
                    "lifeTime": "Thu, 20 Apr 2023 03:13:13 GMT",
                    "ogmTitle": "GitHub - kaizziizg/Shortenin....",
                    "ogmDescription": "a simple ShorteningUrl Service with ....",
                    "ogmImage": "https://opengraph.githubassets.com/..."
                }
            }
        failure:
            {
                "urlInfo": {
                    "owner": "noOwner",
                    "oriUrl": "WhatYouSendURL",
                    "shortUrl": "nwU484",
                    "isSuccess": false,
                    "msg": "This Url doesnt work",
                    "clickTime": 0,
                    "lifeTime": "",
                    "ogmTitle": "",
                    "ogmDescription": "",
                    "ogmImage": ""
                }
            }
> POST  `/shorten`

    | Parameter | Type   | Description             |
    | --------- | ------ | ----------------------- |
    | url       | string | The URL to be shortened |
    | owner     | string | The creater of the URL  |

    Request:
        Content-Type: application/json

    Response:
        Content-Type: application/json
        success:
            {
                "urlInfo": {
                    "owner": "noOwner",
                    "oriUrl": "https://github.com/kaizziizg/ShorteningUrl",
                    "shortUrl": "https://shorteningurl-eh4konhfta-de.a.run.app/Y6NyY2",
                    "isSuccess": true,
                    "msg": "add URL successed",
                    "clickTime": 0,
                    "lifeTime": "Thu, 20 Apr 2023 03:13:13 GMT",
                    "ogmTitle": "GitHub - kaizziizg/Shortenin....",
                    "ogmDescription": "a simple ShorteningUrl Service with ....",
                    "ogmImage": "https://opengraph.githubassets.com/..."
                }
            }
        failure:
            {
                "urlInfo": {
                    "owner": "noOwner",
                    "oriUrl": "WhatYouSendURL",
                    "shortUrl": "nwU484",
                    "isSuccess": false,
                    "msg": "This Url doesnt work",
                    "clickTime": 0,
                    "lifeTime": "",
                    "ogmTitle": "",
                    "ogmDescription": "",
                    "ogmImage": ""
                }
            }

> Get  `/:shorten`

    | Parameter | Type   | Description             |
    | --------- | ------ | ----------------------- |
    | shortUrl  | string | The shortened URL       |
    Response:
        content-type: text/html

        If the short URL is valid, the API will response redirect a html file contains Open Grpah Meta and this html contain javascript to redirect the original URL. If the short URL is not valid, the API will return a 404 error.

## Docker
before build image,must set environment variable
```
# DB connect info
ShortUrlServer={}
ShortUrlUsername={}
ShortUrlPassword={}
<!-- you can find INSTANCE_CONNECTION_NAME from your cloud sql table -->
INSTANCE_CONNECTION_NAME = {}
<!-- isGcpEnv == true,connect MySQL with Unix domain socket -->
<!-- isGcpEnv == false,connect MySQL with TCP -->
isGcpEnv = true/false
```
Also need to set server IP in `/reactjs/src/config.js`
```
const isLocalServer = true;
const serverIP = isLocalServer ? 'http://127.0.0.1:3000' : 'https://shorteningurl-eh4konhfta-de.a.run.app';

export { isLocalServer, serverIP };
```

```
docker run -p 7777:3000 short-url
```

## ER-diagram
![](https://github.com/kaizziizg/ShorteningUrl/blob/main/public/images/ERdiagram.png?raw=true)

## Environment
* Node.js v18.12.1
* React.js 
* TypeScript 4.9.5

## Requirement
- [x] Implemented with TypeScript 4.3+
    O : Node.js X : React.js
- [x] ORM with MySQL 8.0
    * ORM : sequelize
    * MySQL : mysql2
- [x] React App with Functional Component
- [x] check Coding Style with ESLint and (will re-check in Continuous integration)
- [x] Project is build to CloudRun/CloudSQL

- [ ] Unit Test
- [ ] E2E Test
- [ ] TDD
- [x] Integrate (CI)CD
    only Continuous Deployment to CloudRun

## Feature
- [x] check URL exist
    * [tldts](https://www.npmjs.com/package/tldts)
    * [url-exist](https://www.npmjs.com/package/url-exist)
- [x] user registration
- [x] add,update,delete mutiple shortURL
- [x] Users can know the number of short-URL views
- [x] avoid mutiple short-URL map same URL
- [x] get Open Graph Metadata from short-URL
- [ ] Users can Self-modified Open Graph Metadata

## Other Feature
- [x] Short-Url Self-modified
- [x] Generate QR-Code (generate at frontend)
    * [qrcode](https://www.npmjs.com/package/qrcode)
- [x] view Short-Url period and (can extend the period)
