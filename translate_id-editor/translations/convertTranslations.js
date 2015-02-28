var yaml = require("js-yaml");
var fs = require("fs");

var outdir = 'translate_id-editor/translations/yaml/';
var outdirJson = 'translate_id-editor/translations/json/';

var lang_files = fs.readdirSync(outdir);
console.log('No. of files found in '+outdir+': ' + lang_files.length);

//Get all files in the localication dir
for (var i in lang_files){
	if(lang_files[i].match(".+?yaml")!=null){
		var current_file = outdir+lang_files[i];
		console.log('Convert File: ' + current_file);
	
		//Convert the current file
		var lang_yaml = yaml.safeLoad(fs.readFileSync(current_file, 'utf8'));	
		var lang_json = JSON.stringify(lang_yaml,null,'\t');

		//Write to file
		fs.writeFile(outdirJson+lang_files[i].split("\.")[0]+'.json', lang_json, 'utf8');
	}
}