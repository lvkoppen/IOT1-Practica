const chalk = require('chalk');

deviceId = 1;


var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('lampen', function (err) {
        if (client.connected==true) {
            console.log('connected')
        }
    });
    client.subscribe('lamp/' + deviceId + "/#", function (err) {
        if (client.connected==true) {
            console.log('connected')
        }

    });
  });

let lampsettings = {
  "status": 0,
  "alarm" : 0,
  "rgb":{
      "r":255,
      "g":255,
      "b":255
  }
}

console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b).underline('This is a simulated dimmable bulb'));

function print() {
	//console.clear();
	if (lampsettings.status == 0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
	}
	else {
		console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b)('Light is on'));
	}
}

function aan(){
    lampsettings.status = 1;
}

function uit(){
    lampsettings.status = 0
}

client.on('message', function (topic, message) {
    if(topic == 'lamp/1/aan'){aan()}
    if(topic == 'lamp/1/uit'){uit()}
    print();
});

