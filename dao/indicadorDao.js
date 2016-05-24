var dao = new require('./dao.js');

var sqlIndicadores = 'select co_indicador as codigo, ds_indicador as indicador from dbpainel.tb_indicador';

var indicadorDAO = (function() {
	return {
		listIndicadores: function(callback) {
            console.log(dao.conSage);
			dao.execute(callback, dao.conSage, sqlIndicadores);
		}
	}
})();

module.exports = indicadorDAO;