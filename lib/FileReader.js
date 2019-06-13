var fs = require('fs');

var FileReader = function() {};

FileReader.prototype.readInputFile = function(fileName, cb) {
  this.validateInput(fileName, (err, validatedFileName) => {
    if (err) {
      cb(err);
      return false;
    }
    fs.readFile(validatedFileName, { encoding: 'utf-8' }, (err, fileData) => {
      try{
        if(err) throw 'File doesn\'t exist or cannot be accessed';
        if (!fileData.length) throw 'No File!';
        cb(null, fileData);
      }catch(err){
        cb(err)
        return false;
      }
    });
  });
};

FileReader.prototype.validateInput = function(argString, cb) {
  var splitArray = argString.split('.');
  var len = splitArray.length;
  try{
    if (len === 1 && splitArray[0] === argString) throw 'a valid .txt file is needed';
    if (splitArray[len - 1] !== 'txt') throw 'file is not .txt files'
    cb(null, argString);
  }catch(err){
    cb(err)
    return false;
  }
};

module.exports = FileReader;