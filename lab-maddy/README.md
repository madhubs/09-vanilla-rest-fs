# Documentation:
  * What this API does:

  This project is practice in creating a basic API/HTTP server. It is an HTTP server, using a router. We have an object constructor making "toy" objects with two parameters (toy name, toy description). A unique ID is generated for each object utilizing uuid (must install this package). The goal is to POST (create) this toy object, then PUT, GET and DELETE this object from the server. This is also practice in having a single 'in-memory' resource/model for persistence (only while the server is running). We are recreating the basic functionality of ExpressJS as a router. After this practice in building our own router functionality we will learn more about using just Express going forward.

# Learning objectives:
    * How to save resource data to the file system for a layer of data persistence.
    * How to refactor commonly used coding constructs into custom helper modules.

# Any resources that helped me complete this assignment:

#How another dev could 'get started' with my api on their own:
  - How do you clone this project?
  First fork from my repository, then clone from your repo, then create a branch.
  - How do you start using this project?
      1. You will need to have NodeJS installed on your machine.
      2. You will need to install httpie in one terminal window.
      3. Then start up nodemon in a separate terminal window.

# My to do list:
1. Make sure the POSTS, GETS, PUTS and DELETES to the server are all working.
2. Then tests!
  - valid requests (if i send a toy, make a toy)
  - Invalid requests (here's ONE edge case where someone could mess it all up)
  - Then we want to make sure when the tests "pass" (green check), WE MUST CHECK IF IT'S A FALSE POSITIVE

# To create an object on the server, paste this in terminal to test (we're able to do this with the http client- superagent to make request on the server):

## Example POST request:
http POST :3000/api/toy name=barney desc='purple dino'

## Example POST response:
  - Then the following good request info is displayed in terminal:
    ```
    HTTP/1.1 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Date: Mon, 11 Sep 2017 00:21:21 GMT
    Transfer-Encoding: chunked

    {
        "_id": "99c0f97f-3ab0-484d-afc6-607733ee0e83",
        "desc": "purple dino",
        "name": "barney"
    }
    ```

## Example GET request:
http GET :3000/api/toy/ <copy whatever ID you get from the POST into the GET>????

Example:
http GET :3000/api/toy/99c0f97f-3ab0-484d-afc6-607733ee0e83


## Example GET response:
```
```


# Packages and commands to remember:
  - In package.json's scripts, add- "start:debug": "DEBUG=http* nodemon server.js",

  - npm install (for node modules) -
  - npm install httpie -
  - npm install superagent - DONE
  - npm install uuid (this generates those unique IDs for each object created)-
  - npm install -D jest -
    - npm test or npm t (to run jest test)

  - node server.js or just nodemon (depending on the day??)
    - rs (restart, if needed)
  - run start: watch -
  - npm run start: debug -

  - npm run debugger - DONE
  - npm install bluebird (sets this as a dependency in package.json) -DONE

  I added the following to my package.json scripts:
  "debugger": "node inspect server.js",

  Then in terminal, within the project directory, type:
  npm run debugger

    - You should then see:
    > node inspect server.js

## Tests:

* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
 * `GET`: test 200, it should contain a response body for a request made with a valid id

 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 201, it should respond with the body content for a post request with a valid body

 * `PUT`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `PUT`: test 204, it should respond with no body content for a put request with a valid body

 * `DELETE`: test 400, it should respond with 'bad request' if no resource id was provided
 * `DELETE`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `DELETE`: test 204, it should respond with no body content for a request request with a valid resource id

# Collaborators:
Michelle, Aaron, Isaac and Said.
