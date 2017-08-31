![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Vanilla REST API w/ Persistence
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will learn how to save resource data to the file system for a layer of data persistence
* students will learn how to refactor commonly used coding constructs into custom helper modules

## Requirements
#### Configuration
  * `.gitignore`
  * `.eslintrc.json`
  * `.eslintignore`
  * `package.json`
  * `README.md`

#### Feature Tasks
* documentation:
  * write a paragraph about what your API does 
    _(iterate on your docs, clean them up, etc)_
  * document any resources that helped you complete your assignment
  * define how another dev can 'get started' with your api on their own
  * document each of the available endpoints; including example request/response formats for each
* create the following directories to organize your code:
  * `lib`
  * `model`
  * `route`
  * `__test__`
* refactor the storage module to take advantage of the promisified `fs` module
  - use the bluebird Promise library as a way to overwrite the pre-existing Promise implementation in NodeJS
* refactor your response functionality to a modular component of the application
  - ensure that your passing in any dynamic error messages where applicable


## Tests _make an attempt at TDD today!!_
  _note: Your tests should still function correctly as you iterate and refactor your code. Do not start writing a refactor until you have functional tests._
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
  * _note: this will need to change if you complete the bonus point_
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 201, it should respond with the body content for a post request with a valid body
 * `PUT`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `PUT`: test 204, it should respond with no body content for a put request with a valid body
 * `DELETE`: test 400, it should respond with 'bad request' if no resource id was provided
 * `DELETE`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `DELETE`: test 204, it should respond with no body content for a request request with a valid resource id

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request to create a new resource
 * successful status code of 201
* `PUT` request
 * pass data as stringifed JSON in the body of a **PUT** request to update an existing resource
 * if that resource does not exist, create it
 * successful status code of 204
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
 * successful status code of 200
* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * successful status code of 204

## Rubric: 10pts
* 2pts: Documentation 
* 5pts: Feature Tasks
* 3pts: Tests
