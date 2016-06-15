const express = require('express'),
      router = express.Router(),
      metaDao = require('../dao/metaDao.js'),
      numeral = require('numeral'),
      response = require('../helpers/response')
      format_br = require('../helpers/format'),
      _ = require('underscore');

numeral.language('br', format_br);
numeral.language('br');

router.get('/', function (req, res, next) {
   response.exec(metaDao.listMetas,
        function(err, result){
            if(err){
                res.status(500).json({message: err});
                return;
            }
            res.render('metas', result);
        }, 'metas');
});
        

router.get('/:sigla', function(req, res, next) {
    response.exec(function (cb){
            metaDao.metaPorSigla(req.params.sigla,cb);
        },
        function(err,result){
            if(err){
                res.status(404)
                    .render('error', {
                        message: "Dado nao encontrado",
                        error: err
                    });
                return;
            }
            //Recupera o item original
            var resformat = renderMeta(result.item);

            //Troca o item
            var restorend = _.extend(_.omit(result,"item"),{item: resformat});
            res.render('meta', restorend);
        },'item');
});


function renderMeta(result){
  
  var itemselected = result[0];
  var lenArray = itemselected.meses.length;
  
  var obj = new Array(7);

  obj[0] = new Array();
  obj[1] = new Array(lenArray);
  obj[2] = new Array(lenArray);
  obj[3] = new Array(lenArray);
  obj[4] = new Array(lenArray);
  obj[5] = new Array(lenArray);
  obj[6] = new Array(lenArray);
  //obj[7] = new Array(lenArray);

  obj[0][0]='Meses';
  obj[1][0]='Valores';
  obj[2][0]='Realizado';
  obj[3][0]='Quantitativo a ser realizado 2016';
  obj[4][0]='Resultado Anual';
  obj[5][0]='Quantitativo a ser realizado 2016-19';
  obj[6][0]='Resultado Quadrienal';
  //obj[7][0]='Quantidade Acumulada 2016';

  itemselected.meses.forEach((item,i) => {
    obj[0][i+1]=item.nome;
    obj[1][i+1]=numeral(item.valor).format('0,0[.]00');
    obj[2][i+1]=numeral(item.realizado).format('0,0[.]00');  
    obj[3][i+1]=numeral(item.aRealizar).format('0,0[.]00');
    obj[4][i+1]=numeral(item.resultadoAnual).format('0.00%');
    obj[5][i+1]=numeral(item.aRealizar19).format('0,0[.]00');
    obj[6][i+1]=numeral(item.resultadoQuadrienal).format('0.00%');
    //obj[7][i+1]=numeral(item.qtdAcumulada).format('0,0[.]00');
  });
  
  return({
    sigla: itemselected.sigla,
    ano:  itemselected.ano,
    nome: itemselected.nome,
    linhaBase: numeral(itemselected.linhaBase).format('0,0[.]00'),
    meta: numeral(itemselected.meta).format('0,0[.]00'),
    metaQuadrienal: numeral(itemselected.metaQuadrienal).format('0,0[.]00'),
    codigoindicador:itemselected.codigoindicador,
    nomeindicador:itemselected.nomeindicador,
    obj: obj
  });
}

module.exports = router;


