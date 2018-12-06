const expect = require('chai').expect

const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

describe("Signup", function(){
    var Auth, server;
    before(function(done){
        Auth = require('../../src/app')

        const User = require('../models/user')
        const auth = new Auth(
            function(){},
            function(user, done){
                User.create({ username: user.username, password: user.password}, function(err){
                    if(err) done(err)
                    else done()
                })
            }
        )

        app.post('/signup', auth.signup, function(req, res){
            res.sendStatus(201)
        })

        server = app.listen(port, function(){
            console.log("Test server runnin on " + port)
            done()
        })
    })
    after(function(done){
        server.close(() => { console.log("Server killed"); done() })
    })
    describe('(Setup)', function(){
        it("Should be a function", function(){
            var auth = new Auth()
        })
        it("Should accept 3 args", function(){
            
        })
    })
    describe('(Usage)', function(){
        it("Should invoke saveUser() method")
        it("Should invoke errorHandler middleware on saveUser() internal error or Db error")
        it("Should res with status 400 if singup data is not valid")
        describe("(Not valid signup data)", function(){
            it("Should res with [{ param : reason }] if data is invalid")
        })
        it("Should call next() if user is saved")
    })
})