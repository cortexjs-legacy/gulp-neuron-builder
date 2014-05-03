var assert = require('assert');
var es = require('event-stream');
var path = require('path');
var fs = require('fs');
var File = require('vinyl');
var processor = require('../');
var jf = require('jsonfile');

require('should');

describe("should parse css absolute image path correctly", function(){
    it('should prepend text', function(done) {
        var fakeFile = new File({
            path: path.resolve('test/fixtures/input.js'),
            contents: new Buffer(fs.readFileSync('test/fixtures/input.js','utf-8') )
        });

        var p = processor({
            pkg : jf.readFileSync("test/fixtures/mixed_package.json"),
            targetVersion : "latest",
            cwd : path.resolve("./test/fixtures")
        });

        p.once("data",function(file){
            var actual = file.contents.toString();
            var expect = fs.readFileSync('test/expected/output.js','utf-8');
            actual.should.equal(expect);
            done();
        });
        
        p.write(fakeFile);
    });
});