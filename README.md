# This project is example for universal web application

This repository is for example code to any given url request to shortent url. This project writen by KOA framework.

## System required

- nodejs
- Docker
- docker-compse

## How to develop this project

- Start your application in local by this command

```
docker-compose up
```

## ENV configs

.env file should contains these environment values

- PROTOCAL [http || https] (default is http).
- NODE_ENV [production || development] (default is development).
- PORT for port that app is listening to. (default is 3000).
- BASE_URL baseurl of application. (default is localhost).
- REDIS_PORT for redis port. (default is 6379).
