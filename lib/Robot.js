
var Robot = function() {
  this.isPlaced = false;
  this.position = {
    x: null,
    y: null
  };
  this.direction = null;
};


var directionMap = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
};

Robot.prototype.tableSize = {x: 4, y: 4};

Robot.prototype.place = function(paramList) {
  var x = paramList[0];
  var y = paramList[1];
  var direction = directionMap[paramList[2]].value;

  if (x > this.tableSize.x || y > this.tableSize.y) {
    return this;
  }

  this.isPlaced = true;
  this.position.x = x;
  this.position.y = y;
  this.direction = direction;

  return this;
};


Robot.prototype.move = function() {
  if (!this.isPlaced) {
    return this;
  }

  var x = this.position.x;
  var y = this.position.y;

  switch (this.direction) {
    case 'north':
      if (++y < this.tableSize.y) {
        this.position = {x: x, y: y}
      }
      break;
    case 'east':
      if (++x < this.tableSize.x) {
        this.position = {x: x, y: y}
      }
      break;
    case 'south':
      if (--y >= 0) {
        this.position = {x: x, y: y};
      }
      break;
    case 'west':
      if (--x >= 0) {
        this.position = {x: x, y: y}
      }
      break;
    default:
      break;
  }

  return this;
};

Robot.prototype.turn = function(direction) {

  if (!this.isPlaced) {
    return this;
  }

  var resultDirection = directionMap[this.direction][direction];

  if (resultDirection) {
    this.direction = resultDirection;
  }

  return this;
};

Robot.prototype.report = function() {
  if (!this.isPlaced) {
    return this;
  }

  console.log('\x1b[33m',('REPORT:') + ' ' + [this.position.x, this.position.y,this.direction.toUpperCase()].join(','));

  return this;
};

Robot.prototype.runInstructions = function(instructionList) {
  var instruction;
  var robot = this;

  for (var i = 0; i<instructionList.length; i++) {
    instruction = instructionList[i];
    if (instruction.args) {
      robot = this[instruction.command](instruction.args);
    } else {
      robot = this[instruction.command]()
    }
  }

  return robot;
};

module.exports = Robot;



