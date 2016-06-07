var express = require('express');
var router = express.Router();

var metaDao = require('../dao/metaDao.js');

//metas
router.get('/', function(req, res, next) {
	metaDao.listMetas(function(err, result) {
		if(err){
			console.log(err);
		}
		res.json(result);
	});
});

router.get('/:sigla', function(req, res, next) {
	metaDao.metaPorSigla(function(err,result){
		if(err){
			res.status(500).json({ message: err});
			return;
		}
		res.json(result);
	}, req.params.sigla);	
});


module.exports = router;