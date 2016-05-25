var pg = require('pg');

dao = (function(){
	return {
		conSage:string = "postgres://rest_user:12345678@10.1.2.25/dbspo",
		conEcar:string = "postgres://rest_user:12345678@10.1.2.25/decar",
		execute: function(callback, conection, sql, param) {
			var client = new pg.Client(conection);
			client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}

				callbackCli = function(err, result) {
					//if(err) {
					//	return console.error('error running query', err);
					//}

					callback(err, result);

					client.end();
				};
				
				if(typeof param === 'undefined') {
					client.query(sql, callbackCli);
				}else {
					client.query(sql, param, callbackCli);
				}
			});
		}
	}
})();

module.exports = dao;