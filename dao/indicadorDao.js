var dao = new require('./dao.js');

const sqlIndicadores = 'select co_indicador as codigo, ds_indicador as indicador from dbpainel.tb_indicador where ds_sql is not null';
const sqlIndicadorSql = 'select co_indicador as codigo, ds_indicador as indicador, ds_sql as sql from dbpainel.tb_indicador ';
const sqlIndicadoresCount = 'select count(*) as qtd from dbpainel.tb_indicador ';
const sqlIndicadoresComResultadoCount = 'select count(*) as qtd from dbpainel.tb_indicador where ds_sql is not null';

var currentyear = new Date().getFullYear();

var indicadorDAO = (function() {
	return {
		countIndicadores: function(callback){
			dao.execute(function(err, resultcount){
				if(err) return callback(err,null);
				callback(null, parseInt(resultcount.rows[0].qtd));
			}, dao.conSage, sqlIndicadoresCount);
		},
		countIndicadoresComResultado: function(callback){
			dao.execute(function(err, resultcount){
				if(err) return callback(err,null);
				callback(null, parseInt(resultcount.rows[0].qtd));
			}, dao.conSage, sqlIndicadoresComResultadoCount);
		},
		executePorCodigo:function(callback, cod,ano){
			if(!ano){
				ano = currentyear;
			}
			var sql = sqlIndicadorSql + 'where co_indicador=$1::text';
			executeIndicador(callback, sql, cod, ano);	
		},
		executePorId:function(callback, id, ano){
			if(!ano){
				ano = currentyear;
			}
			var sql = sqlIndicadorSql+ 'where co_indicador_principal=$1::integer';
			executeIndicador(callback,sql , id, ano);	
		},
		listIndicadores: function(callback) {
			dao.execute((err, result) => {
				callback(err, result.rows)
			}, dao.conSage, sqlIndicadores);
		}
	}
})();


function executeIndicador(callback, sql, search, ano){
	dao.execute(function(err, result){
		if(!(result.rows && result.rows[0] && result.rows[0].sql)){
			callback({Err:"Nao Encontrado"});
			return ;
		}
		
		var indicadorsql = 'select t2.nu_ano as ano, t2.nu_mes as mes, coalesce(valor,0) as valor from (' 
			+ result.rows[0].sql
			+') as t1 right outer join sage.td_mesano t2 on t1.ano=t2.nu_ano and t1.mes=t2.nu_mes ';
			
		if(ano)
			indicadorsql += 'where t2.nu_ano<=$1::integer and t2.nu_ano>2014'; //TODO: Checar se 2014 seria o ano de corte 
		indicadorsql +='order by 1,2';

		dao.execute(function(err, result2){
			if(err){
				callback({codigo: result.rows[0].codigo, descricao: result.rows[0].indicador,erro: "Não encontrado"});
				return;
			}
			//console.log('Codigo %s - %s', result.rows[0].codigo, result.rows[0].indicador);
			//console.log(result2.rows);
			callback(null, {codigo: result.rows[0].codigo, titulo: result.rows[0].indicador , valores: result2.rows})
		}, dao.conSage, indicadorsql, [ano]);
	}, dao.conSage, sql, [search]);
}
module.exports = indicadorDAO;