const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
// Creating a new thread: POST request to /api/threads/{board}
// Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
// Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
// Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
// Reporting a thread: PUT request to /api/threads/{board}
// Creating a new reply: POST request to /api/replies/{board}
// Viewing a single thread with all replies: GET request to /api/replies/{board}
// Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
// Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
// Reporting a reply: PUT request to /api/replies/{board}
let testThread_id;
let testReply_id;
suite('Functional Tests', function () {
    suite("10 Functional tests", function () {
        // Creating a new thread: POST request to /api/threads/{board}
        // Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
        // Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password  
        test('Creating a new thread: POST request to /api/threads/{board}', function (done) {
            chai
                .request(server)
                .post('/api/threads/test-board')
                .send({ text: 'test text', delete_password: 'test' })
                .end(function (err, res) {
                    assert.equal(res.staus, 200);
                    assert.equal(res.body.text, 'test text');
                    assert.equal(res.body.delete_password, 'test');
                    assert.equal(res.body.reported, false);
                    testThread_id = res.body._id;
                    done();
                });
        });
        test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function (done) {
            chai
                .request(server)
                .get('/api/threads/test-board')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.exits(res.body[0], 'There is a thred');
                    assert.equal(res.body[0].text, 'test text');
                    done();
                });
        });
        test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', function (done) {
            chai
                .request(server)
                .delete('/api/threads/test-board')
                .set('content-type', 'application/json')
                .send({ thread_id: testThread_id, delete_password: 'incorrect' })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'Incorrect Password');
                    done();
                    });
        });
        // Reporting a thread: PUT request to /api/threads/{board}
        // Creating a new reply: POST request to /api/replies/{board}
        test('Reporting a thread: PUT request to /api/threads/{board}', function (done) {
            console.log('testThread_id', testThread_id);
            chai
                .request(server)
                .put('/api/threads/test-board')
                .set('content-type', 'application/json')
                .send({ report_id: testThread_id })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'Success');
                    done();
                    });
            });
        test('Creating a new reply: POST request to /api/replies/{board}', function (done) {
            chai
                .request(server)
                .post('/api/replies/test-board')
                .set('content-type', 'application/json')
                .send({
                    thread_id: testThread_id,
                    text:'test reply',
                    delete_password: 'testreply',
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.threads[0].replies[0].text, 'test reply');
                    testReply_id = res.body.threads[0].replies[0]._id;
                    done();
                });
        });
        // Viewing a single thread with all replies: GET request to /api/replies/{board}
        test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function (done) {
            chai
                .request(server)
            .get('')
        suite('Functional Tests', function () {

        });
    });

