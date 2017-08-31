'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

// fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json)
// .then(...)
// .catch(...)

const storage = module.exports = {};
// const memory = {};
// const memory = {
//   'toy': { //this is the schema, from route-toy.js
//     '123-456-789': {_id: '123-456-789', name: 'barney', desc: 'purple dino'}
//   },//copied the id from terminal so that he could make a GET request.
//'kid': {
//  'id...'

//}
// }

//POST
storage.create = function(schema, item) {
  debug('#create');
  debugger;
  if(!schema) return Promise.reject(new Error('cannot create; schema required'));
  if(!item) return Promise.reject(new Error('cannot create; item required'));
  if(!memory[schema]) memory[schema] = {};

  memory[schema][item._id] = item;
  return Promise.resolve(item);
};

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));
    if(!memory[schema]) return reject(new Error('cannot get item; schema does not exist'));
    if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    return resolve(memory[schema][itemId]);
  });
};


//PUT
storage.update = function(schema, item) {
  debug('#update');
  if(!schema) return Promise.reject(new Error('cannot create; schema required'));
  if(!item) return Promise.reject(new Error('cannot create; item required'));
  if(!memory[schema]) memory[schema] = {};

  memory[schema][item._id] = item;
  return resolve(item);
};

//DELETE

// storage.delete = function() {
//
// };
