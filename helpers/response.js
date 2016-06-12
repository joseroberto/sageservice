const async = require('async'),
      counters = require('../helpers/counters'),
      _ = require("underscore"),
      numeral = require('numeral');

// load a language
numeral.language('br', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'R$'
    }
});

numeral.language('br');


var response= (function() {
    return{
        exec: (cbPesquisa, cbResult, label)=>{
            async.parallel({
                res: (callback) => {
                    cbPesquisa(callback);
                },
                qtdMetas: (callback) => {
                counters.getNumMetas(callback);
                },
                qtdMetasComIndicador: (callback) => {
                    counters.getNumMetasComIndicador(callback);
                },
                qtdIndicadores: (callback)=>{
                    counters.getNumIndicadores(callback);
                },
                qtdIndicadoresComResultado: (callback) => {
                    counters.getNumIndicadoresComResultado(callback);
                }
            },
            // optional callback
            function(err, result){
                if(err){
                    cpResult({message: err});
                    return;
                }
                cbResult(null,_.extend({
                    qtdMetas: result.qtdMetasComIndicador,
                    qtdIndicadores: result.qtdIndicadoresComResultado,
                    percMetas: numeral(result.qtdMetasComIndicador/result.qtdMetas).format('0%'),
                    percIndicadores: numeral(result.qtdIndicadoresComResultado/result.qtdIndicadores).format('0%')
                }, obj[label] = result.res));
            });
        }
    }
})();

module.exports = response;


