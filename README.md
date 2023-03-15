# ShorteningUrl
a simple ShorteningUrl Service with Node.js,React.js
## WEB API
> POST `/shorten`

    Request:
        Content-Type: x-www-form-urlencoded
        Key/Value : url/Oriurl
    Response:
        {
            "success": true,
            "originalUrl": "https://myapollo.com.tw/blog/docker-env/",
            "shortUrl": "https://127.0.0.1/AxY6E2"
        }



## Docker
before build image,you must set environment variable
```
# DB connect info
ENV ShortUrlServer={}
ENV ShortUrlUsername={}
ENV ShortUrlPassword={}
ENV INSTANCE_CONNECTION_NAME = {}
<!-- you can find INSTANCE_CONNECTION_NAME from your cloud sql table -->
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
- [x] ORM with MySQL 8.0
    * ORM : sequelize
    * MySQL : mysql2
- [x] React App with Functional Component
- [x] check Coding Style with ESLint and will re-check in Continuous integration
- [x] Project is build to CloudRun/CloudSQL

- [ ] Unit Test
- [ ] E2E Test
- [ ] TDD
- [x] Integrate CICD

## Feature
- [x] check URL exist
    * [url-exist](https://www.npmjs.com/package/url-exist)
- [ ] user registration
- [ ] add,update,delete mutiple shortURL
- [ ] Users can know the number of short-URL views
- [ ] avoid mutiple short-URL map same URL
- [ ] get Open Graph Metadata from short-URL
- [ ] Users can Self-modified Open Graph Metadata

## Other Feature
- [ ] Short-Url Self-modified
- [ ] Generate QR-Code (generate at frontend)
    * [qrcode](https://www.npmjs.com/package/qrcode)
- [ ] Short-Url period and can extend the period
