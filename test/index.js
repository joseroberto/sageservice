var boot = require('../bin/www').boot,
    shutdown = require('../bin/www').shutdown,
    port = require('../bin/www').port,
    superagent = require('superagent'),
    expect = require('expect.js'),
    async = require('async');

var events = require('events');
var eventEmitter = new events.EventEmitter();
  
var uri = 'http://localhost:'+port;
var api = uri + '/api/v1';

var indicadores;
var metas;

describe('sageservice', function () {
        before(function () {
            console.log('boot');
            boot();
        });
        
        describe('Pagina API', function(){
            it('responde ao GET',function(done){
                superagent
                .get(uri)
                .end(function(err, res){
                    expect(res.status).to.equal(200);
                    done();
                    })
            }),
            it('retorna dados de indicadores',function(done){
                superagent
                .get(api + '/indicador')
                .end(function(err, res){
                    expect(err).to.be(null);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.above(0);
                    if(!err)
                        eventEmitter.emit('indicadores', res.body);
                    done()
                    })
            }),
            it('retorna dados de metas',function(done){
                superagent
                .get(api + '/meta')
                .end(function(err, res){
                    expect(err).to.be(null);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.above(0);
                    if(!err)
                        eventEmitter.emit('metas', res.body);

                    done();
                    })
            })    
        });
       
     after(function () {
         console.log('shutdown');
         shutdown();
     });      
});     

eventEmitter.once('indicadores', (result)=>{
   describe('sageservice', function () {
        before(function () {
            console.log('boot');
            boot();
        });
    
        ////////////////
        describe('indicadores', function(){
            result.forEach((item) => {
            it('indicador ' + item,function(done){
                ////////////
                superagent
                .get(api + '/indicador/' + item.codigo)
                .end(function(err, res){
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.valores).to.be.an('array');
                    expect(res.body.valores.length).to.be.above(0);
                    done()
                })
                ////////////   
            });
        });
        ////////////////
        after(function () {
            console.log('shutdown');
            shutdown();
        });
   });    
});
});

eventEmitter.once('metas', (result)=>{
   describe('sageservice', function () {
        before(function () {
            console.log('boot');
            boot();
        });
    
        ////////////////
        describe('metas', function(){
            result.forEach((item) => {
                if(item.sigla){
                    it('meta ' + item,function(done){
                        ////////////
                        superagent
                        .get(api + '/meta/' + item.sigla)
                        .end(function(err, res){
                            expect(res.status).to.equal(200);
                            expect(res.body).to.be.an('object');
                            expect(res.body.valores).to.be.an('array');
                            expect(res.body.valores.length).to.be.above(0);
                            done()
                        })
                        ////////////
                     });
                }
        });
        ////////////////
        after(function () {
            console.log('shutdown');
            shutdown();
        });
   });    
});
});
 
