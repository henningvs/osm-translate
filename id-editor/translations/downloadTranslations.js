//Based on https://github.com/openstreetmap/iD/blob/master/data/update_locales.js

var http = require('https');
var yaml = require("js-yaml");
var fs = require("fs");

var resources = ['core', 'presets'];
var outdir = 'id-editor/translations/yaml/';
var api = 'https://www.transifex.com/api/2/';
var project = api + 'project/id-editor/';
var localesLanguages = ['en', 'de'];

var auth = JSON.parse(fs.readFileSync('id-editor/translations/transifex.auth', 'utf8'));

getIDTransifexLocales = function() {
	
	for(var resource in resources){
	    for (var currentlanguage in localesLanguages) {
	    	var currFile = outdir + resources[resource] + "_"+localesLanguages[currentlanguage]+".yaml";
			console.log('Download id-editor File: ' + currFile);
	    	var currentLanguageContent = fs.createWriteStream(currFile);
	    	
	    	var path = project+'resource/'+resources[resource]+'/translation/'+localesLanguages[currentlanguage]+'/';
	    	console.log('Get File: '+path);
	    	var request = http.request({
	    		'hostname': path,
	    		'port': 80,
	    		'auth': auth["username"] + ':' + auth["password"]
	    	}, function(response) {
	    	  response.pipe(currentLanguageContent);
	    	});
	    	
	    	request.end();
	    }		
	}

};

getIDTransifexLocales();