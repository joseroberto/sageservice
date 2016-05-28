var dao = require('./dao');
var _ = require("underscore");
var indicadorDao = require('./indicadorDao');

var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

var sqlMeta = 'select cod_iett::integer as codigometa, ds_ppa_mi as sigla, nome_mi as descricao from dbsitedemas.tb_meta_iniciativa';
var sqlMetaEcar = 'select co_meta_inic as codigometa from dbpainel.tb_integracao_ecar where co_meta_inic is not null';
var sqlMetaPorSigla = 'select cod_iett::integer as codigometa, ds_ppa_mi as sigla, nome_mi as descricao from dbsitedemas.tb_meta_iniciativa where ds_ppa_mi=$1::text';
var sqlMetaEcarPorCodigoMeta = 'select co_indicador_principal as codigoindicador, vl_valor2016 as valor, vl_total as valortotal from dbpainel.tb_integracao_ecar where co_meta_inic =$1::integer';

var metaDao = (function() {
	return {
		listMetas: function(callback) {
			dao.execute(function (err, resultmetas){
				if(err) return new Error("Nao Encontrado:"); //TODO: Tratamento de erro
				dao.execute(function(err, resultfilter){
					if(err) return callback(err,null);
					callback(err,_.filter(resultmetas.rows, (item)=>{
						return _.findWhere(resultfilter.rows, {codigometa: item.codigometa});
					}));
				}, dao.conSage, sqlMetaEcar);
			}, dao.conEcar, sqlMeta);
		},
		metaPorSigla: function(callback, sigla){
			var resultado = [];
			var ano = new Date().getFullYear();
			dao.execute(function(err, resultmeta){
				if(err) return callback("Nao encontrado",null);//TODO: Tratamento de erro
				if(resultmeta.rowCount > 0){
					var meta = resultmeta.rows[0];

							
							/*
							id: 1, 
                    nome: 'Ampliar o número de equipes da Estratégia Saúde da Família para 46 mil',
                    ano: 2016,
                    linhaBase: 39308,
                    meta: 43465,
                    metaQuadrienal: 46465,
                    meses: [
                        {nome: 'Jan', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Fev', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Mar', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Abr', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Mai', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Jun', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Jul', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Ago', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Set', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Out', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Nov', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654},
                        {nome: 'Dez', realizado: 346, aRealizar: 4157, resultadoAnual: 0.083, aRealizar19: 7157, resultadoQuadrienal: 0.048, qtdAcumulada: 39654}
                    ]
                }	*/
					dao.execute(function (err, resultvalor){
						if(err) return callback("Nao encontrado",null);//TODO: Tratamento de erro
							var element = resultvalor.rows[0];
						//_.each(resultvalor.rows, (element, index, list)=>{

							indicadorDao.executePorId((resultindicador)=>{
									resultado.push(
										{id: meta.codigometa, nome: meta.descricao, ano: ano, linhaBase: 40000, 
										meta: element.valor, metaQuadrienal: element.valortotal, 
										meses: indicadorAnalise(ano,element.valor, element.valortotal, 40000, resultindicador)});	
										callback(resultado); //TODO: Verificar como fazer para forcar sync								
							}, element.codigoindicador);	
						//});	
					}, dao.conSage, sqlMetaEcarPorCodigoMeta,[meta.codigometa]);

				};
			}, dao.conEcar, sqlMetaPorSigla, [sigla]);
		}
	}
})();

function indicadorAnalise(ano, valorMeta, valorMetaTotal, valorBase, indicador){
	var resultadoMeses = [];
	var valorIndicador;
	var valorBaseIndicador = valorBase;
	var valorRealizado = 0.0;
	var valoraRealizar = 0.0;
	var valoraRealizar19 = 0.0;
	
	_.each(_.filter(indicador.valores, function(obj){
			return obj.ano == ano;
		}
	), (element, index, list)=>{
		valorIndicador = parseFloat(element.valor);
		valorRealizado = valorIndicador - valorBaseIndicador;
		valoraRealizar = valorMeta - valorIndicador;
		valoraRealizar19 = valorMetaTotal - valorIndicador;
		valorBaseIndicador=valorIndicador;
		
		resultadoMeses.push(
			{nome: monthNames[element.mes], 
				realizado: valorRealizado, 
				aRealizar: valoraRealizar, resultadoAnual: (valorRealizado/valoraRealizar), aRealizar19: valoraRealizar19, 
			resultadoQuadrienal: (valorRealizado/valoraRealizar19), qtdAcumulada: valorBaseIndicador});
		
	});
	
	return resultadoMeses;
}

module.exports = metaDao;