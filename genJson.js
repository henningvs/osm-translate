#!/usr/bin/env node

//Include 'yamljs' module.
var yaml = require("js-yaml");
var fs = require("fs");

var lang_files = fs.readdirSync('./openstreetmap-website/config/locales/');
console.log('No. of files found in ./openstreetmap-website/config/locales/: ' + lang_files.length);

//Get all files in the localication dir
for (var i in lang_files){
	if(lang_files[i].match(".+?yml")!=null){
		var current_file = './openstreetmap-website/config/locales/'+lang_files[i];
		console.log('Convert File: ' + current_file);
	
		//Convert the current file
		var lang_en_yaml = yaml.safeLoad(fs.readFileSync(current_file, 'utf8'));	
		var lang_en_json = JSON.stringify(lang_en_yaml);

		//Write to file
		fs.writeFile('./locales/'+lang_files[i].split("\.")[0]+'.json', lang_en_json, 'utf8');
	}
}





