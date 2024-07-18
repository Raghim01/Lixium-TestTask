# Small Twitter like App

This application is written using Nest.js framework, A progressive Node.js framework for building efficient and scalable server-side applications.

## Installation

```bash
$ npm install
```

## Set up environment variables and connecting to MySQL DB !!!No Docker way: (If want to use docker-compose, follow only first two steps).
In .env.example file you can find an example of how your own .env file should look like:
- create an .env file;
- copy the content from .env.example;
- if needed change ONLY values of variables (put your own password, port, or username);
- using MySQL Workbench connect to database and create a schema called twitter;

## Use docker-compose file.
If you want to use a docker compose file, that is already configured in the project, follow the steps:

```bash
#create and up the container
docker-compose up

#stop container 
docker-compose stop

#start container 
docker-compose start
```

Now, when the container is app, you have to add a new connection in DB, using the configurations from docker-compose file:
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
