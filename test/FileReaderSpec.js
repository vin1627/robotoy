var expect = require('chai').expect;
var FileReader = require('../lib/FileReader');
var path = require('path');

describe('FileReader', function() {
  var fileReader = new FileReader();

  it('should throw an error if the file is not a text file', (done) => {
    fileReader.readInputFile(path.join(__dirname, 'data/nonTextFile.xml'), (err) => {
      expect(err).to.exist;
      done();
    });
  });

  it('should correctly read in the contents of a text file', (done) =>{
    fileReader.readInputFile(path.join(__dirname, 'data/test1.txt'), (err, fileData) => {
      expect(err).to.be.null;
      expect(fileData).to.equal('PLACE 0,0,NORTH\nMOVE\nREPORT');
      done();
    });
  });

  it('should throw an error if file is empty', (done) =>{
    fileReader.readInputFile(path.join(__dirname, 'data/testEmpty.txt'), (err) =>{
      expect(err).to.exist;
      done();
    });
  });
});