const readline = require('readline');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Press enter voor beweging");

rl.on('line', (input) => {
  console.log("Er is beweging geconstateerd");
  client.publish('huis/beweging', "255")
});