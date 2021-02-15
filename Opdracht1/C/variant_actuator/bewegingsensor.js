const readline = require('readline');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('huis/beweging', function (err) {
      if (client.connected==true) {
        console.log('connected')
      }
      else{
          console.log('not connected')
      }
    })
  })


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Press enter voor beweging");


function Aan(){
  client.publish('huis/beweging', "255")
}

function Uit(){
  client.publish('huis/beweging', "0")
}
rl.on('line', (input) => {
  console.log("Er is beweging geconstateerd");
  Aan();
  setTimeout(Uit, 5000)
});