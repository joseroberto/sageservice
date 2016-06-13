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
	metaDao.metaPorSigla(req.params.sigla, function(err,result){
		if(err){
			res.status(404).json({ message: err});
			return;
		}
		res.json(result);
	});	
});


module.exports = router;