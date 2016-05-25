var dao = new require('./dao.js');

const sqlIndicadores = 'select co_indicador as codigo, ds_indicador as indicador from dbpainel.tb_indicador where ds_sql is not null';
const sqlIndicadorSql = 'select co_indicador as codigo, ds_indicador as indicador, ds_sql as sql from dbpainel.tb_indicador where co_indicador=$1::text';

var indicadorDAO = (function() {
	return {
		executeIndicador: function(callback, cod){
			dao.execute(function(err, result){
				dao.execute(function(err, result2){
					if(err){
						callback({codigo: result.rows[0].codigo, descricao: result.rows[0].indicador,erro: "Não encontrado"});
						return;
					}
					console.log('Codigo %s - %s', result.rows[0].codigo, result.rows[0].indicador);
					callback({codigo: result.rows[0].codigo, titulo: result.rows[0].indicador , valores: result2.rows})
				}, dao.conSage, result.rows[0].sql);
			}, dao.conSage, sqlIndicadorSql, [cod]);
		},
		listIndicadores: function(callback) {
			dao.execute(callback, dao.conSage, sqlIndicadores);
		}
	}
})();

module.exports = indicadorDAO;