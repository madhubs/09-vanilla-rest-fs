'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Toy = require('../model/toy');

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

//POST (a storage method)
storage.create = function(schema, item) {
  debug('#create');
  // debugger;
  return new Promise((resolve, reject)=> {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!item.name || !item.desc) return reject(new Error('cannot create; item required'));

    let newToy = new Toy(item.name, item.desc);

    let json = JSON.stringify(newToy);

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
      .then(() => resolve(newToy)) //take the item and hand to route (route-toy.js) and then moved to the response model.
      .catch(console.error);//or reject
  });
};


storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toString())))
      .catch(err => {
        console.error(err);
        return err;
      });
  });
};

storage.fetchAll = function() {

};

storage.update = function(schema, item) {
  debug('#update');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update item; schema required'));
    if(!item) return reject(new Error('cannot update item; updated item required'));

  });
};

//DELETE
storage.delete = function() {

};
