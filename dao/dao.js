const pg = require('pg'),
 	yaml = require('js-yaml'),
 	fs = require('fs');

// Get document, or throw exception on error
try {
  var doc = yaml.safeLoad(fs.readFileSync('config/databases.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

dao = (function(){
	return {
		conSage:string = doc.conSage,
		conEcar:string = doc.conEcar,
		execute: function(callback, conection, sql, param) {
			var client = new pg.Client(conection);
			client.connect(function(err) {
				if(err) {
					return console.error('could not connect to postgres', err);
				}

				callbackCli = function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}

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