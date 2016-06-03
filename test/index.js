var boot = require('../bin/www').boot,
    shutdown = require('../bin/www').shutdown,
    port = require('../bin/www').port,
    superagent = require('superagent'),
    expect = require('expect.js');

var uri = 'http://localhost:'+port;
var api = uri + '/api/v1/';

describe('sage service', function () {
    before(function () {
        boot();
    });
    /**
     * Rotas
     */
    describe('servidor', function(){
        it('está on line',function(done){
            superagent
            .get(uri)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done()
             })
        })
    });

    /**
     * Metas
     */
    describe('meta', function(){
        it('lista metas',function(done){
            superagent
            .get(api + 'meta') 
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done()
            })
        })
    });        

    /**
     * Indicadores
     */
    describe('indicador', function(){
        it('lista indicadores',function(done){
            superagent
            .get(api + 'indicador') 
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done()
            })
        })
    });        

    after(function () {
        shutdown();
    });
  });