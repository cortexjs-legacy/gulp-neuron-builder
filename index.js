var es = require('event-stream');
var parser = require('./lib/parser');


// Plugin function
function neuronBuildGulp(opt){

    function modifyContents(file, cb){
        if(file.isNull()) return cb(null, file);


        parser.parse(file.path,file.contents.toString(),opt,function(err, result){
            var buf = new Buffer(result);
            file.contents = buf;
            return cb(null, file);
        });
    }

    return es.map(modifyContents);
}

module.exports = neuronBuildGulp;