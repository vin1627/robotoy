
## Installation & usage

If you install it locally, you can use it within the directory via ```npm start``` or ```node```.
```sh
$ npm install
$ npm start -- instructions.txt
$ node ./bin/robot.js instructions.txt
```

## Instruction format

The simulator only accepts instructions.txt files, with one command per line. The commands available are:

- **PLACE X, Y, DIRECTION (PLACE 0,1,NORTH):** Place the robot on the table.
- **MOVE:** Move the robot one unit in the direction it is facing
- **LEFT:** Turn the robot left
- **RIGHT:** Turn the robot right
- **REPORT:** Report the current position and direction of the robot (0,0,NORTH)

The table is a 5x5 grid, and any command that would result in the robot being off the table *will be ignored*.


## Tests

```sh
$ npm test
```

Test input files are available in ```test/data```. 


