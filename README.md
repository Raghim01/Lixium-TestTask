# Small Twitter like App

This application is written using Nest.js framework, A progressive Node.js framework for building efficient and scalable server-side applications.

## Installation

```bash
$ npm install
```

## Set up environment variables and connecting to MySQL DB !!!No Docker way: (If want to use docker-compose, follow only first two steps).
In <ins>.env.example</ins> file you can find an example of how your own <ins>.env</ins> file should look like:
- create an .env file;
- copy the content from .env.example;
- if needed change ONLY values of variables (put your own password, port, or username);
- using MySQL Workbench connect to database and create a schema called twitter;

## Use docker-compose file.
If you want to use a <ins>docker-compose</ins> file, that is already configured in the project, follow the steps:

```bash
#create and up the container
docker-compose up

#stop container 
docker-compose stop

#start container 
docker-compose start
```

Now, when the container is app, you have to add a new connection in DB, using the configurations from <ins>docker-compose</ins> file:
- port: 3307
- password: root 

Then you will see that you already have a schema called <ins>twitter</ins> . 

## Running the app
After the previous step you should can run successfully the app:

```bash
# development - watch mode
$ npm run start:dev

# development - debug & watch mode
$ npm run start:debug

# production mode
$ npm run start
```

## Accessing Swagger documentation
After the application is started, search in browser for:

```bash
http://localhost:3000/api#/
```

## In order to see how some of the fucntional was implemented (validation, errors catching, etc.):

1) Limiting the number of characters in tweets and comments to 160:
   For that purpose was used a ValidationPipe, a powerful instrument provided by Nest.js which can be use to validate or transform some data.
   ```
     if (value && value.content !== undefined) {
      const contentLength = value.content.trim().length;

      if (contentLength === 0 || contentLength > 160) {
        throw new BadRequestException(
          'Tweet content must be between 1 and 160 characters long',
        );
      }
    }
   ```
2) 
