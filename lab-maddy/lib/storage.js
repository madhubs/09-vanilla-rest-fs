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

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${newToy._id}.json`, json) //changed from item
      .then(() => resolve(newToy)) //take the item and hand to route (route-toy.js) and then moved to the response model.
      .catch(console.error);//or reject
  });
};


storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'))
    if(!itemId) return reject(new Error('cannot get item; itemId required'))

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(buff => {
      try {
        let toy = JSON.parse(buff.toString())
        return resolve(toy)
      } catch(e) {
        return reject(e)
      }
    })
    .catch(reject)
  })
}

storage.fecthAll = function(schema) {
  debug('#fetchAll')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get items; schema required'))

    return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(ids => {
      let data = Array.prototype.map.call(ids, (id => id.split('.', 1).toString()))
      return resolve(data)
    })
    .catch(reject)
  });
}


storage.update = function(schema, item) {
  debug('#update')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update; schema required'))
    if(!item) return reject(new Error('cannot update; item required'))

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, JSON.stringify(item))
    .then(resolve)
    .catch(reject)
  })
}

//DELETE
storage.destroy = function(schema, itemId) {
  debug('#destroy')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot delete item; schema required'))
    if(!itemId) return reject(new Error('cannot delete item; itemId required'))

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(resolve)
    .catch(reject)
  });
}
