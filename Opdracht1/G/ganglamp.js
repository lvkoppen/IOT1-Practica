
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
      if(lampsettings.status ==1){
        beweging(lampsettings)
      }
  }  
}
function changestatus(state){
  lampsettings.status = state
}
function beweging(){
  setTimeout(changestatus, lampsettings.interval, 0)
}

client.on('message', function (topic, message) {
      switch(topic){
        case 'gebouw/lampen':
          changestate
          break;
        case 'gebouw/lampen/update':
          updatesettings(JSON.parse(message.toString()));
        default:
          console.log("geen juiste topic gevonden");
          break;

      }
});
