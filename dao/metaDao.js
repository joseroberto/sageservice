var dao = require('./dao.js');

var sqlMeta = 'select sigla_mi as sigla, nome_mi as descricao from dbsitedemas.tb_meta_iniciativa';

var metaDao = (function() {
	return {
		listMetas: function(callback) {
			dao.execute(callback, dao.conEcar, sqlMeta);
		}
	}
})();

module.exports = metaDao;