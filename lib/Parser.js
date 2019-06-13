
var Parser = function () {};

Parser.prototype.parseArgs = function(args, cb) {
  try{
    if (!args.length) throw 'Must pass instructions to the robot';
    var parsedArgsArray = args
    .split('\n')
    .map(function(instruction) {
      return instruction.toLowerCase();
    })
    .reduce(function(instructionList, rawInstruction) {
      var parsedInstruction = this.parseInstruction(rawInstruction);
      if (parsedInstruction) {
        instructionList.push(parsedInstruction);
      }
      return instructionList;
    }.bind(this), []);
    if (!parsedArgsArray.length) throw 'No valid instructions passed';
    cb(null, parsedArgsArray);
  }catch(err){
    cb(err)
    return false;
  }
};

Parser.prototype.validDirections = ['north', 'south', 'east', 'west'];

Parser.prototype.parseInstruction = function(rawInstructionString) {
  var instructionObject;
  var multiWordInstructionList = rawInstructionString.split(' ');

  if (multiWordInstructionList.length > 1 && multiWordInstructionList[0] === 'place') {
    instructionObject = this.parsePlaceInstruction(multiWordInstructionList);
  } else {
    instructionObject = this.parseSingleWordInstruction(rawInstructionString);
  }

  if (instructionObject) {
    return instructionObject;
  }
};

Parser.prototype.parsePlaceInstruction = function(placeParts) {
  var placeArgsList = placeParts[1].split(',');

  var x = parseInt(placeArgsList[0], 10);
  var y = parseInt(placeArgsList[1], 10);
  var direction = placeArgsList[2];

  if (!isNaN(x) && !isNaN(y) && (this.validDirections.indexOf(direction) > -1)) {
    return {
      command: 'place',
      args: [x, y, direction]
    };
  } else {
    return null;
  }
};

Parser.prototype.parseSingleWordInstruction = function(instructionString) {
  switch (instructionString) {
    case 'move':
      return {
        command: 'move'
      };
    case 'left':
      return {
        command: 'turn',
        args: 'left'
      };
    case 'right':
      return {
        command: 'turn',
        args: 'right'
      };
    case 'report':
      return {
        command: 'report'
      };
    default:
      return null;
  }
};

module.exports = Parser;