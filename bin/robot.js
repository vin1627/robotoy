var app = require('../index.js');
var fileName = process.argv[2];
app.runSimulation(fileName, (err, robot) =>{
  try{
    if (err) throw err;
    if (!robot.isPlaced) console.log('\x1b[33m','Your robot was never placed on the table :(');
    console.log('')
    console.log('\x1b[36m',('simulation is DONE!'));
    console.log('')
  }catch(err){
    console.log('\x1b[31m','ERROR:' + ' ' + err.message);
    return false;
  }

});
