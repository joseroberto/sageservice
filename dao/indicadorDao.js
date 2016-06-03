var dao = new require('./dao.js');

const sqlIndicadores = 'select co_indicador as codigo, ds_indicador as indicador from dbpainel.tb_indicador where ds_sql is not null';
const sqlIndicadorSql = 'select co_indicador as codigo, ds_indicador as indicador, ds_sql as sql from dbpainel.tb_indicador ';

var indicadorDAO = (function() {
	return {
		executePorCodigo:function(callback, cod){
			var sql = sqlIndicadorSql + 'where co_indicador=$1::text';
			executeIndicador(callback, sql, cod);	
		},
		executePorId:function(callback, id){
			var sql = sqlIndicadorSql+ 'where co_indicador_principal=$1::integer';
			executeIndicador(callback,sql , id);	
		},
		listIndicadores: function(callback) {
			dao.execute(callback, dao.conSage, sqlIndicadores);
		}
	}
})();


function executeIndicador(callback, sql, search){
	dao.execute(function(err, result){
		if(!(result.rows && result.rows[0] && result.rows[0].sql)){
			callback({Err:"Nao Encontrado"});
			return ;
		}
		dao.execute(function(err, result2){
			if(err){
				callback({codigo: result.rows[0].codigo, descricao: result.rows[0].indicador,erro: "Não encontrado"});
				return;
			}
			console.log('Codigo %s - %s', result.rows[0].codigo, result.rows[0].indicador);
			callback(null, {codigo: result.rows[0].codigo, titulo: result.rows[0].indicador , valores: result2.rows})
		}, dao.conSage, result.rows[0].sql);
	}, dao.conSage, sql, [search]);
}
module.exports = indicadorDAO;