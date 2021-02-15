const readline = require('readline');
const fs = require('fs');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('gebouw/lampen', function (err) {
      if (client.connected==true) {
        console.log('connected')
      }
    })
  })


var lampsetting;

fs.readFile('C:\\Users\\Lennart\\Desktop\\IoT1-Practica\\IOT1-Practica\\Opdracht1\\H\\lampsettings.json', (err, data) => {
    if (err) throw err;
    lampsetting = JSON.stringify(JSON.parse(data));
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Press enter om de lampen te updaten");


rl.on('line', (input) => {
  console.log("sterkte ingevoerd");
  client.publish('gebouw/lampen', lampsetting)
});