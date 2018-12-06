const expect = require('chai').expect
const httpRequest = require('supertest')

const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

describe("Signup", function () {
    var Auth, server, auth, User;
    var saveUserCalled = false
    before(function (done) {
        Auth = require('../../src/app')

        User = require('../models/user')
        auth = new Auth(
            function () { },
            function (user, done) {
                User.create({ username: user.username, password: user.password }, function (err) {
                    if(user.username === "unknow error") done("unknow error")
                    else if(user.username === "invalid") done("user-policy")
                    else if (err) done(err)
                    else done()
                })
            }
        )
        
        app.post('/signup', auth.signup(), function (req, res) {
            res.sendStatus(201)
        })

        app.use(function(err, req, res, next){
            res.sendStatus(500)
        })

        server = app.listen(port, function () {
            console.log("Test server runnin on " + port)
            done()
        })
    })
    after(function (done) {
        server.close(() => { console.log("Server killed"); done() })
    })
    describe('(Setup)', function () {
        it("Should be a function", function () {
            expect(typeof auth.signup === 'function')
        })
    })
    describe('(Usage)', function () {
        it("Should call next() if user is saved", function (done) {
            httpRequest(app)
                .post('/signup')
                .set('Content-Type', 'application/json')
                .send({ username : "bran", password : "stark"})
                .expect(201, function (err, res) {
                    if (err) done(err)
                    else {
                        done()
                    }
                })
        })
        it("Should invoke errorHandler middleware on saveUser() internal error or Db error", function(done){
            httpRequest(app)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .send({ username : "unknow error", password : "stark"})
            .expect(500, function (err, res) {
                if (err) done(err)
                else {
                    done()
                }
            })
        })
        it("Should res with status 400 if singup data is not valid", function(done){
            httpRequest(app)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .send({ username : "invalid", password : "stark"})
            .expect(400, function (err, res) {
                if (err) done(err)
                else {
                    done()
                }
            })
        })
        describe("(Not valid signup data)", function () {
            it("Should res with [{ param : reason }] if data is invalid")
        })
    })
})