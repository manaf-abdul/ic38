# ic38


Built in Nodejs 
framework-express

Requirements
For running project, you will only need Docker and Docker Compose or Nodejs (make sure that the nodejs version is 16.14.2) installed.

Clone Repository

$ git clone https://github.com/deevsaini/ic38.git

Configure app

Create a .env file in your root directory. You will need:

- PORT
- BODY_LIMIT (eg: "5gb" | "4mb")
- APP_URL (eg: "http://localhost:3000")
- REDIS_URL (eg: "redis://redis:6379")
- MULTER_FILE_LIMIT ( "in byte" )
- MONGODB_URI
- JWT_SECRET
- GOOGLE_CLIENT_ID
- FIREBASE_PROJECT_ID
- FIREBASE_CLIENT_EMAIL
- FIREBASE_PRIVATE_KEY


Running the project

Running the application without docker

For Development
$ yarn start

For Production
$ yarn build
$ yarn start

or

$ yarn build:start

Running the application with docker

For Production
$ docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

For Production
$ docker-compose up -d
