'use strict';

var connectionString =
  "HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=service;DeviceId=device-student-22-device-1;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=";

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;


const chalk = require('chalk');

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

client.on('message', (msg) => {
    msg = JSON.parse(msg.getData());
    updatesettings(msg);
});

var lampsettings = { 
  "interval" : 2350,
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
lampsettings.rgb.r = 128;
lampsettings.rgb.g = 128;
lampsettings.rgb.b = 128;


setInterval(alarm, lampsettings.interval);


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
    print()
  }  
}



