#!/usr/bin/env node

//Include 'js-yaml' module.
var yaml = require("js-yaml");

var lang_en = require("./openstreetmap-website/config/locales/en.yaml");

//Log the Englisch json output
console.log(JSON.stringify(lang_en, null, "    "));