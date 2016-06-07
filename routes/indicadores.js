var express = require('express');
var _ = require("underscore");
var router = express.Router();

var indicadorDao = require('../dao/indicadorDao.js');

//indicadores
router.get('/', function(req, res, next) {
	indicadorDao.listIndicadores(function(err, result) {
		if(err){
			
		}
		res.json(result.rows);
	});
});

router.get('/:codigo', function(req,res,next){
	indicadorDao.executePorCodigo(function(err,result){
		if(err){
			res.status(500).json({ message: err});
			return;
		}
		res.json(result);
	}, req.params.codigo);	
});

router.get('/:codigo/:ano', function(req,res,next){
	indicadorDao.executePorCodigo(function(err,result){
		if(err){
			
		}
		res.json({codigo: result.codigo, titulo: result.titulo, valores:  _.filter(result.valores, function(obj){
			return obj.ano == req.params.ano;
		}
		)});
	}, req.params.codigo);	
});

module.exports = router;