var express = require('express');
var router = express.Router();

var metaDao = require('../dao/metaDao.js');

//metas
router.get('/', function(req, res, next) {
	metaDao.listMetas(function(err, result) {
		if(err){
			
		}
		res.json(result.rows);
	});
});

module.exports = router;