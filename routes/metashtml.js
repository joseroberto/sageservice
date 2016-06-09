var express = require('express');
var router = express.Router();
var metaDao = require('../dao/metaDao.js');

router.get('/:sigla', function(req, res, next) {
  metaDao.metaPorSigla(function(err,result){
      if(err){
        res.status(500).json({ message: err});
        return;
      }
 
      res.render('metas', {itens: result});
  }, req.params.sigla);
});

router.get('/', function (req, res, next) {
  res.render('meta');
});

module.exports = router;


