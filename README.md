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
- using MySQL Workbench connect to database and create a schema called <ins>twitter</ins>;

## Use docker-compose file.
If you want to use a <ins>docker-compose</ins> file, that is already configured in the project, follow the steps:

```bash
#create and start the container
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

1) Limiting the number of characters in tweets and comments to 160.<br />
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
   And after that, as a last step, pipe was binded globally:
   ```
     app.useGlobalPipes(new ValidateCharactersPipe());

   ```
2) For the fields validation was used decorators from <ins>class-validator</ins>, a package that works perfectly in combination with Nest.js.<br />
   In order to make these decorators work globally, a global ValidationPipe, that is already built in Nest.js, was bound globally.
   ```
     app.useGlobalPipes(new ValidationPipe());

   ```
3) In order to effectively identify errors that occur in the application, a custom exception filter has been created:<br />
   In catch() we have the access to <ins>exception</ins> that occur in the app, and the <ins>host: ArgumentHost</ins>, which gives us access to Request and Response of the app.
   ```
   catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, message } = this.parseExeption(exception);

    response.status(statusCode).json({ status: statusCode, message });
   }
   ```
  

   And the <ins>parseException</ins> function which receives like argument current exception, and returns <ins>status code and message</ins> of the error.<br />
   In case that error is a HttpException error it will return respective message and status code, in other case will be returned a <ins>Server Error and Code: 500</ins>.
   
   ```
   private parseExeption(exception: any) {
    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGE.serverError;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus() ?? HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    return { statusCode, message };
   }
   ```


