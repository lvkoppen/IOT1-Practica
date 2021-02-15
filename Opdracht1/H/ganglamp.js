
const chalk = require('chalk');

var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('gebouw/lampen', function (err) {
      if (client.connected==true) {
        console.log('connected to topic gebouw/lampen')
      }
    })
  })

//var helderheid =process.env['Helderheid'];
var lampsettings = { 
  "interval" : 2000,
  "status": 1,
  "alarm" : 0,
  "rgb":{
      "r":255,
      "g":255,
      "b":255
  }
}

console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b).underline('This is a simulated dimmable bulb'));

lampsettings.status = 0
print();
lampsettings.rgb.r = 128;
lampsettings.rgb.g = 128;
lampsettings.rgb.b = 128;



setInterval(print, 2000);
setInterval(alarm, 2500);


function print() {
	//console.clear();
	if (lampsettings.status == 0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
	}
	else {
		console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b)('This is a simulated bulb'));
	}
}

function updatesettings(settings){
  
  if(typeof settings !== 'undefined' && settings){
      Object.keys(settings).forEach(function(key){
        lampsettings[key] = settings[key]
      })
  }  
}


function alarm(){
  if(lampsettings.alarm == 1){
    if(lampsettings.status == 0){

      lampsettings.rgb.r = 255
      lampsettings.rgb.g = 0
      lampsettings.rgb.b = 0
       
      lampsettings.status = 1

    }
    else {
      lampsettings.status = 0
    }
  }
}

client.on('message', function (topic, message) {
          updatesettings(JSON.parse(message.toString()));
});
