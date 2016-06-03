var boot = require('../bin/www').boot,
    shutdown = require('../bin/www').shutdown,
    port = require('../bin/www').port,
    superagent = require('superagent'),
    expect = require('expect.js'),
    async = require('async');
    
var uri = 'http://localhost:'+port;
var api = uri + '/api/v1';

describe('sageservice', function () {
        before(function () {
            console.log('boot');
            boot();
        });
        
        describe('Pagina inicial', function(){
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
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.above(0);
                    done()
                    })
            }),
            it('retorna dados de metas',function(done){
                superagent
                .get(api + '/meta')
                .end(function(err, res){
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.above(0);
                    done();
                    })
            }) //,
        
    /////////////
    /*
    it('retorna dados de metas',function(done){
        superagent
        .get(api + '/indicador')
        .end(function(err, res){
            
            describe('Teste indicadores', function(){
            ////////////////
            async.eachSeries(res.body,(item, callback) =>{
                it('teste do indicador - ' + item.codigo,function(doneindicador){
                    //superagent
                    //.get(api + '/indicador/'+item.codigo)
                    //.end(function(err, res){
                    //    if(err) {
                    //        expect(err).to.be(undefined);
                    //        return;
                    //    }
                    //    expect(res.status).to.equal(200);
                    //    expect(res.body).to.be.an('array');
                    //    expect(res.body.length).to.be.above(0);
                    //    async.setImmediate(function () {
                            console.log(item.codigo);
                            callback(null,done);
                            doneindicador();
                    //    });
                    }); // it
                }, (done)=>{
                    done();
                }); // async
            ///////////////////////
            });
            //done();
        });
  });    
  //////////
  */

     });
     after(function () {
         console.log('shutdown');
         shutdown();
     });      
});       
 