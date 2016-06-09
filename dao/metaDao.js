var dao = require('./dao');
var _ = require("underscore");
var indicadorDao = require('./indicadorDao');

var monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

var sqlMeta = 'select cod_iett::integer as codigometa, ds_ppa_mi as sigla, nome_mi as descricao from dbsitedemas.tb_meta_iniciativa';
var sqlMetaEcar = 'select co_meta_inic as codigometa from dbpainel.tb_integracao_ecar where co_meta_inic is not null';
var sqlMetaPorSigla = 'select cod_iett::integer as codigometa, ds_ppa_mi as sigla, nome_mi as descricao from dbsitedemas.tb_meta_iniciativa where ds_ppa_mi=$1::text';
var sqlMetaEcarPorCodigoMeta = 'select co_indicador_principal as codigoindicador, vl_valor2016 as valor, vl_total as valortotal ' 
									+ 'from dbpainel.tb_integracao_ecar where co_meta_inic =$1::integer';

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
			var mes = new Date().getMonth();
			dao.execute(function(err, resultmeta){
				if(err) return callback(err,null);//TODO: Tratamento de erro
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
						if(err) return callback(err,null);
							var element = resultvalor.rows[0];

						//_.each(resultvalor.rows, (element, index, list)=>{
							indicadorDao.executePorId((err, resultindicador)=>{
									if(err){
										callback(err);
										return;
									}
									var vbase = valorBase(ano, resultindicador);
									var valorbase = parseFloat(vbase.valor);

									resultado.push(
										{id: meta.codigometa, sigla: meta.sigla,  nome: meta.descricao, ano: ano, linhaBase: valorbase, 
										meta: element.valor, metaQuadrienal: element.valortotal,
										codigoindicador: resultindicador.codigo, 
										nomeindicador: resultindicador.titulo, 
										meses: indicadorAnalise(ano,mes, element.valor, element.valortotal, valorbase, 
											resultindicador)});	
									callback(null, resultado); 								
							}, element.codigoindicador, ano);	
						//});	
					}, dao.conSage, sqlMetaEcarPorCodigoMeta,[meta.codigometa]);

				};
			}, dao.conEcar, sqlMetaPorSigla, [sigla]);
		}
	}
})();

function valorBase(ano, indicador){
	return _.max(_.filter(indicador.valores, (itemFilter)=>{
		return itemFilter.ano != ano;
	}), (item) => {
		return item.ano*100+item.mes;
	});
}

function indicadorAnalise(ano, mes, valorMeta, valorMetaTotal, valorBase, indicador){
	var resultadoMeses = [];
	var valorIndicador;
	var valorBaseIndicador = valorBase;
	var valorRealizado = 0.0;
	var valoraRealizar = 0.0;
	var valoraRealizar19 = 0.0;
	
	if(indicador && indicador.valores.length > 0)
		_.each(_.filter(indicador.valores, function(obj){
				return obj.ano == ano;
			}
		), (element, index, list)=>{
			valorIndicador = parseFloat(element.valor);
			valorRealizado = (valorIndicador==0 && element.mes==mes)? valorIndicador: valorIndicador - valorBaseIndicador;
			valoraRealizar = (valorIndicador==0 && element.mes>=mes)? 0 : valorMeta - valorIndicador;
			valoraRealizar19 = (valorIndicador==0 && element.mes>=mes)? 0 : valorMetaTotal - valorIndicador;
			valorBaseIndicador=valorIndicador;
			
			resultadoMeses.push(
				{nome: monthNames[element.mes-1], 
					realizado: valorRealizado, 
					aRealizar: valoraRealizar, 
					resultadoAnual: (valoraRealizar==0 ? 0 : (valorRealizado/valoraRealizar)), 
					aRealizar19: valoraRealizar19, 
					resultadoQuadrienal: (valoraRealizar==0 ? 0 : (valorRealizado/valoraRealizar19)), 
					qtdAcumulada: valorBaseIndicador});
		});
	
	return resultadoMeses;
}

module.exports = metaDao;