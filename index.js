var Robot = require('./lib/Robot');
var FileReader = require('./lib/FileReader');
var Parser = require('./lib/Parser');

var robot = new Robot();
var fileReader = new FileReader();
var parser = new Parser();

var app = {};

app.readFile = function(fileName, cb){
  fileReader.readInputFile(fileName, (err, fileData) =>{
    if (err) {
      cb(err);
      return false;
    }

    parser.parseArgs(fileData, (err, instructionList)=> {
      if (err) {
        cb(err);
        return false;
      }

      cb(null, instructionList);
    })
  });
};

app.runSimulation = function(fileName, cb) {
  this.readFile(fileName, (err, instructionList) => {
    if (err) {
      cb(err);
      return false;
    }

    robot = robot.runInstructions(instructionList);
    cb(null, robot);
  });
};

module.exports = app;