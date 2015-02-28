//Based on https://github.com/openstreetmap/iD/blob/master/data/update_locales.js

var http = require('https');
var yaml = require("js-yaml");
var fs = require("fs");
var async = require('async');

var resources = ['core', 'presets'];
var outdir = 'id-editor/translations/yaml/';
var host = 'www.transifex.com';
var api = '/api/2/';
var project = api + 'project/id-editor/';
var localesLanguages = ['en', 'de'];

var auth = JSON.parse(fs.readFileSync('id-editor/translations/transifex.auth', 'utf8'));

getIDTransifexLocales = function() {
	var array = [];
	var count=0;
	for(var res in resources){
	    for (var curr in localesLanguages) {
	    	array[count] = [];
	    	array[count]['resource'] = resources[res];
	    	array[count]['language'] = localesLanguages[curr];
	    	count++;
	    }		
	}
	
	async.each(array, downloadFile)

};

function downloadFile(reslang, callback){
	
	resource = reslang['resource'];
	language = reslang['language'];

	var currFile = outdir + resource + "_"+language+".yaml";
	console.log('Download id-editor File: ' + currFile);
	var currentLanguageContent = fs.createWriteStream(currFile);
	
	var path = project+'resource/'+resource+'/translation/'+language+'/';
	console.log('Get File: '+host+path);
	
	var currentRequest = http.get({
		'hostname': host,
		'path': path,
		'port': 443,
		'method': 'GET',
		'auth': auth["username"] + ':' + auth["password"]
		}, function(res) {
			
	    res.on('data', function(data) {
	    		currentLanguageContent.write(data);
	        }).on('end', function() {
	        	currentLanguageContent.end();
	            console.log('Successfully downloaded: '+resource + "_"+language+' to '+outdir);
	            callback(null);
	        });
	});
};

getIDTransifexLocales();