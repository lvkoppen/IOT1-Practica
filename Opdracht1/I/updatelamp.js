var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('gebouw/beweging', function (err) {
      if (client.connected==true) {
        console.log('connected')
      }
    })
  })


var lampsetting = {"alarm": 1}
var counter = 0;

function clearcounter(){counter = 0}

function checkalarm(){
  console.log('beweging gedetecteerd')
  if(++counter > 1){
    client.publish('gebouw/alarm', JSON.stringify(lampsetting))
    console.log('alarm gaat af')
  }
  counter = ++counter
}

setInterval(clearcounter, 8000);

client.on('message', function (topic, message) {
  if(topic = 'gebouw/beweging'){checkalarm()}
});
