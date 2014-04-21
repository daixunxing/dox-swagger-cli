#!/usr/bin/env node

var program = require('commander'),
    packageInfo = require('../package'),
    doxSwagger = require('dox-swagger'),
    path = require('path'),
    fs = require('fs'),
    path = require('path');


program
    .version(packageInfo.version)
    .option('-b, --basePath [http://localhost]', 'api url path', 'http://localhost')
    .option('-d, --description []', 'api description', '')
    .option('-i, --input [lib]', 'code dir', 'lib')
    .parse(process.argv);




if(!/(http|https)/.test(program.host)) {
    program.host = 'http://' + program.host;
}

//current path

var basePath = path.resolve('.');

var codeDir = path.join(basePath, program.input);

var files = fs.readdirSync(codeDir);


files.forEach(function (item) {
    doxSwagger.doxSwagger(path.join(codeDir ,item), program);
})

fs.writeFileSync(path.join(basePath, 'api-list.json'), JSON.stringify(doxSwagger.apiResourceList));

