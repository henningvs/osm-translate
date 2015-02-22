//Based on https://github.com/openstreetmap/iD/blob/master/data/update_locales.js

var http = require('http');
var yaml = require("js-yaml");

var resources = ['core', 'presets'];
var outdir = './yaml/';
var api = 'http://www.transifex.com/api/2/';
var project = api + 'project/id-editor/';
var localesLanguages = {"en", "de"};

var auth = JSON.parse(fs.readFileSync('./transifex.auth', 'utf8'));

getIDTransifexLocales = function() {
	
	for(var resource in resources){
	    for (var currentlanguage in localesLanguages) {
	    	var currFile = outdir + resource + "_"+currentlanguage+".yaml";
			console.log('Download id-editor File: ' + currFile);
	    	var currentLanguageContent = fs.createWriteStream(currFile);
	    	
	    	var request = http.request({
	    		'hostname': project+currentlanguage+'/',
	    		'auth': auth["username"] + ':' + auth["password"]
	    	}, function(response) {
	    	  response.pipe(currentLanguageContent);
	    	});
	    	
	    	request.end();
	    }		
	}

};

function getLanguage(resource) {
    return function(code, callback) {
        code = code.replace(/-/g, '_');
        var url = resource + 'translation/' + code;
        if (code === 'vi') url += '?mode=reviewed';
        request.get(url, {
                auth: auth
            },
            function(err, resp, body) {
                if (err) return callback(err);
                callback(null, yaml.load(JSON.parse(body).content)[code]);
            });
    };
}