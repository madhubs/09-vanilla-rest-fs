'use strict';

const debug = require('debug')('http:router');
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');

const Router = module.exports = function() {
  this.routes = {//routes property with get, post, put delete objects...
    GET: {
      // '/cowsay': (req, res)=>{} //a router instance, with a key, a value and an end point/do a thing,
      // '/toy': (req, res)=> {}
      //'/kid': 'hello world' //not a valid callback
    },
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

// app.get('/', (req, res)=> res.send)


Router.prototype.get = function(endpoint, callback) {
  debug('#Router.get');
  this.routes.GET[endpoint] = callback;//callback is line 10
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

//this whole callback is what runs when we call http.createServer in server.js
Router.prototype.route = function(){
  return(req, res) => {
    Promise.all([ //we can take in one or many requests. they will be
      parseUrl(req),
      parseJson(req)
    ])
      .then(()=> {//once all the promises have been returned, we validate that this thing is a function. is the thing on line 10 a valid callback function
        if(typeof this.routes[req.method][req.url.pathname] === 'function'){
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('route not found');
        res.end();
      })
      .catch(err => {
        debug(`houston, we have a problem: \n${err.message}`);//used to be consolge.log

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request; something went wrong in the router');
        res.end();
      }); //if everything works properly we'll never hit the .catch
  };
};
