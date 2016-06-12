const async = require('async'),
      counters = require('../helpers/counters'),
      _ = require("underscore"),
      numeral = require('numeral')
      format_br = require('./format');

numeral.language('br', format_br);

var response= (function() {
    return{
        exec: (cbPesquisa, cbResult, label)=>{
            async.parallel({
                res: (callback) => {
                    if(cbPesquisa)
                        cbPesquisa(callback);
                    else    
                        callback();
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
                var obj={};
                if(result.res)
                    obj[label] = result.res;
                cbResult(null,_.extend({
                    qtdMetas: result.qtdMetasComIndicador,
                    qtdIndicadores: result.qtdIndicadoresComResultado,
                    percMetas: numeral(result.qtdMetasComIndicador/result.qtdMetas).format('0%'),
                    percIndicadores: numeral(result.qtdIndicadoresComResultado/result.qtdIndicadores).format('0%')
                }, obj));
            });
        }
    }
})();

module.exports = response;


