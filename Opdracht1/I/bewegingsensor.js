const readline = require('readline');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('gebouw/lampen', function (err) {
      if (client.connected==true) {
        console.log('connected')
      }
      else{
          console.log('not connected')
      }
    })
  })

var settings = {"status": 1}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Press enter voor beweging");

rl.on('line', (input) => {
  console.log("Er is beweging geconstateerd");
  client.publish('gebouw/beweging', JSON.stringify(settings))
});