const expect = require('chai').expect

const express = require('express')
const bodyParser = require('body-parser')

const port = 3000
var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


describe("Setup", function(){
    var Auth, server;
    before(function(done){
        Auth = require('../../src/app')
        server = app.listen(port, function(){
            console.log("Test server runnin on " + port)
            done()
        })
    })
    after(function(done){
        server.close(() => { console.log("Server killed"); done() })
    })
    it("Should be requirable", function(){
        require('../../src/app')
    })
    it("Should be an object", function(){
        expect(new Auth(function(){}, function(){}) instanceof Object)
    })
    describe('(Constructor)', function(){
        it('Construcor should recieve two args', function(){
            new Auth(function(){}, function(){})
        })
    })
})