'use strict';

const superagent = require('superagent');
const server = require('../../server');
const Promise = require('bluebird');//allows us to promisify stuff that isn't already naturally a promise to be able to stay asynchroneous
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('jest');

describe('Testing toy routes', function() {
  afterAll(done => server.close(done)); //when we end tests we want to automatically turn the server off, so that when we want to do something else with the server we can!

  describe('All requests to /api/toy', () => {

    // POST VALID Requests
    describe('POST requests', () => {
      describe('Valid Requests', () => {
        test('POST should create and return a new toy, given a valid request', (done) => {
          superagent.post(':3000/api/toy')//deleted beforeAll() above superagent
            .type('application/json')
            .send({
              name: 'barney',
              desc: 'purple dino'
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              expect(this.mockToy).toBeInstanceOf(Object);
              expect(this.mockToy).toHaveProperty('name');
              expect(this.mockToy).toHaveProperty('desc');
              done();
            });
        });
        // NAME property
        test('Name- should have a name, given a valid request', (done) => {
          expect(this.mockToy.name).toBe('barney');
          done();
        });
        // DESC property
        test('Desc- should have a desc, given a valid request', (done) => {
          expect(this.mockToy.desc).toBe('purple dino');
          done();
        });
        // ID properties- to have an ID
        test('ID- should have an _id, given a valid request', (done) => {
          expect(this.mockToy).toHaveProperty('_id');
          expect(this.mockToy._id).toBeTruthy();//got rid of regex
          done();
        });
        //
        test('should return a 201 CREATED, given a valid request', (done) => {
          expect(this.resPost.status).toBe(201);
          done();
        });
      });

      // INVALID POST REQUEST
      describe('Invalid Requests', () => {
        test('invalid POST should return 400', (done) => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send() //or can use null
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });
        });
      });
    });
    // END OF POST

    //A GET! Thanks to Said! For running to Kyle and asking questions!
    // * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
    // * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
    //  * _note: this will need to change if you complete the bonus point_
    // * `GET`: test 200, it should contain a response body for a request made with a valid id
    describe('GET requests', () => {
      describe('Valid request', () => {
        test('GET valid- should contain a response body for a request made with a valid ID', (done) => {
          superagent.get(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              expect(this.mockToy).toBeInstanceOf(Object);
              expect(this.mockToy).toHaveProperty('name');
              expect(this.mockToy).toHaveProperty('desc');
              done();
            });
          // INVALID GET Request for no ID FOUND
          describe('Invalid Requests', () => {
            test('should return ID not found', (done) => {
              superagent.get(':3000/api/toy')
                .type('application/json')
                .send({_id: 'Said' }) //or can use null
                .catch(err => {
                  expect(err.status).toBe(404);
                  done();
                });
            });
            // INVALID GET Request for no ID PROVIDED
            describe('Invalid Requests', () => {
              test('should return bad request because no ID provided', (done) => {
                superagent.get(':3000/api/toy')
                  .query({_id: 'aaaaaad9e6cf-bfb5-4454-9535-4a5b884543c8'}) //grabbed an ID from a created toy but gave it some extra a's.
                  .catch(err => {
                    expect(err.status).toBe(400);
                    done();
                  });
              });
            });
          });
    // END OF GET

          // PUT VALID -- 9/8, 8:30pm mobbing with Michelle and Said.
          // * `PUT`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
          // * `PUT`: test 204, it should respond with no body content for a put request with a valid body
          describe('PUT requests', () => {
            describe('For valid PUT requests specifically', () => {
              test('PUT requests should give you a valid body', done => {
                superagent.put(':3000/api/toy')
                  .query({_id: this.mockToy._id}) //get toy object by id
                  .type('application/json') // it will be in json format
                  .send({ //these are the properties that will be sent when we update
                    name: 'michelle',
                    desc: 'human girl',
                    _id: this.mockToy._id
                  })
                  .then(res => {
                    this.mockToy = res.body;
                    this.resPut = res;
                    expect(this.mockToy).toBe('michelle');
                    expect(this.mockToy).toBe('human girl');
                    done();
                  });
              });
            });
          });
          // INVALID PUT Requests
          describe('Invalid Requests', () => {
            test('should not update, should return 400', (done) => {
              superagent.put(':3000/api/toy')
                .type('application/json')
                .send() //or can use (null).
                .catch(err => {
                  expect(err.status).toBe(400);
                  done();
                });
            });
          });
        });

    // DELETE
        describe('DELETE requests', () => {
          // VALID Requests
          describe('Valid Requests', () => {
            beforeAll(done => {
              superagent.delete(':3000/api/toy')
                .query({_id: 'this.mockToy._id'})
                .then(res => {
                  this.resDelete = res;
                  done();
                });
            });
            test('should remove the record from the toy dir', (done) => {
              fs.readdirProm(`${__dirname}/../../data/toy`)
                .then(files => {
                  let expectedFalse = files.includes(`${this.mockToy._id}.json`)
                  expect(expectedFalse).toBeFalsy();
                  done();
                });
            });
          });
          // INVALID Requests
          describe('Invalid Requests', () => {
            test('should return 404', (done) => {
              superagent.delete(':3000/api/toy')
                .type('application/json')
                .send() //or can use (null)
                .catch(err => {
                  expect(err.status).toBe(400);
                  done();
                });
            });
          });
        });
      });
    });
    });
});
