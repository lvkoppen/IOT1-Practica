
const chalk = require('chalk');

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




//var helderheid =process.env['Helderheid'];
var helderheid=255;
console.log(chalk.rgb(helderheid, helderheid, helderheid).underline('This is a simulated dimmable bulb'));

helderheid = 0;
print();
helderheid = 128;
setInterval(print, 2000);

function print() {
	//console.clear();
	if (helderheid==0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
	}
	else {
		console.log(chalk.rgb(helderheid, helderheid, helderheid)('This is a simulated bulb'));
	}
}

client.on('message', function (topic, message) {
    helderheid = Number(message.toString());
  })