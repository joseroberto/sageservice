const dao = require('../dao/dao'),
    _ = require('underscore'),
    async = require('async');

var metas = [
  {
    "co_indicador": "PSF01",
    "co_meta": "0265",
    "vl_base": 39308,
    "vl_2016": 43465,
    "vl_2017": 44465,
    "vl_2018": 45465,
    "vl_2019": 46465,
    "vl_total": 46465
  }];

  // co_indicador_principal | co_meta_inic | vl_valor2016 | vl_valor2017 | vl_valor2018 | vl_valor2019 | vl_total | vl_linha_base 
  var tasks = [];

  metas.forEach((item)=>{
    async.series([(cb)=>{
              // busca id indicador
              dao.execute(cb,"postgres://vasconcelos:serenaya@10.1.2.25/dbspo", "select co_indicador_principal as codigo from dbpainel.tb_indicador where co_indicador=$1::text", [item.co_indicador]);
      },
      (cb)=>{
              // busca id da meta
              dao.execute(cb,"postgres://vasconcelos:serenaya@10.1.2.25/decar", "select cod_iett::integer as codigo from dbsitedemas.tb_meta_iniciativa where ds_ppa_mi=$1::text", [item.co_meta]);
      }
    ],
    (err, res)=>{
      if(err){
        console.log(err);
        process.exit();
      }
      var idindicador = res[0].rows[0].codigo;
      var idmeta = res[1].rows[0].codigo;
        // cadastra na lista  a task
        tasks.push((cb) => {
            dao.execute(cb,
                "postgres://vasconcelos:serenaya@10.1.2.25/dbspo", 
                "delete from dbpainel.tb_integracao_ecar where co_indicador_principal=$1::integer and co_meta_inic=$2::integer", 
                [idindicador, idmeta]);
          }
        );
        tasks.push((cb) => {
            dao.execute(cb,
                "postgres://vasconcelos:serenaya@10.1.2.25/dbspo", 
                "insert into dbpainel.tb_integracao_ecar "
                +"(co_indicador_principal,co_meta_inic, vl_linha_base, vl_valor2016, vl_valor2017, vl_valor2018, vl_valor2019, vl_total) "
                +"values ($1::integer, $2::integer, $3, $4, $5, $6, $7, $8)", 
                [idindicador, idmeta, item.vl_base, item.vl_2016, item.vl_2017, item.vl_2018, item.vl_2019, item.vl_total]);
          }
        );

        // Executa as tasks serial
        async.series(tasks, (err,result) => {
          if(err) console.log(err);
            console.log('metas atualizadas... finalizado.')
           process.exit()
        });

    }
    );



  });

(function wait () {
   if (true) setTimeout(wait, 5000);
})();
