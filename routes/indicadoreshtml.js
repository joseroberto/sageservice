const express = require('express'),
      router = express.Router(),
      indicadorDao = require('../dao/indicadorDao.js'),
      numeral = require('numeral'),
      response = require('../helpers/response'),
      format_br = require('../helpers/format');

numeral.language('br', format_br);

router.get('/', function (req, res, next) {
    response.exec(indicadorDao.listIndicadores,
            function(err, result){
                if(err){
                    res.status(500).json({message: err});
                    return;
                }
                res.render('indicadores', result);
            }, 
    'indicadores');
});

router.get('/:codigo', function(req,res,next){
    response.exec(function(cb){
            indicadorDao.executePorCodigo(cb, req.params.codigo);
        },
        function(err, result){
                if(err){
                    res.status(500).json({message: err});
                    return;
                }
                res.render('indicador', result);
        }, 
        'item');
});


module.exports = router;