const cacheManager = require( "cache-manager"),
metaDao = require('../dao/metaDao.js'),
indicadorDao = require('../dao/indicadorDao.js');

var cache = cacheManager.caching({store: 'memory', max: 1000, ttl: 10});

var ttl = 5;

var counters = (function() {
    return{
        getNumMetas: (cb) => {
            var id = 'qtdMetas';
            cache.wrap(id, function (cacheCallback) {
                metaDao.countMetas(cacheCallback);
            }, (err, result) =>{
                cb(null, result);
            });
        },
        getNumMetasComIndicador: (cb) => {
            var id = 'qtdMetasComIndicador';
            cache.wrap(id, function (cacheCallback) {
                metaDao.countMetasComIndicador(cacheCallback);
            }, (err, result) =>{
                cb(null, result);
            });
        },
        getNumIndicadores: (cb) => {
            var id = 'qtdIndicadores';
            cache.wrap(id, function (cacheCallback) {
                indicadorDao.countIndicadores(cacheCallback);
            }, (err, result) =>{
                cb(null, result);
            });
        },
        getNumIndicadoresComResultado: (cb) => {
            var id = 'qtdIndicadoresComResultado';
            cache.wrap(id, function (cacheCallback) {
                indicadorDao.countIndicadoresComResultado(cacheCallback);
            }, (err, result) =>{
                cb(null, result);
            });
        }
    }
})();

module.exports = counters;