#!/usr/bin/env node

//Include 'yamljs' module.
var yaml = require("yamljs");

var lang_en_yaml = yaml.load("./openstreetmap-website/config/locales/en.yml");
var lang_en_json = JSON.stringify(lang_en_yaml);

console.log(lang_en_json);


//var lang_en = require("./openstreetmap-website/config/locales/en.yml");

//Log the Englisch json output
//console.log(JSON.stringify(lang_en, null, "    "));
//var lang_en_jon = yaml.safeLoad(lang_en);
