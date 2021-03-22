'use strict';


const deviceId = "device-student-22-device-4";
const sas = "a2Sh1qCEZ9mpPOxgrdzu4OiwcNptIPKKM9UyaL+UtOM=";

const connectionString = `HostName=DelftIotHubPracticum2021.azure-devices.net;DeviceId=${deviceId};SharedAccessKey=${sas};`

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;


const chalk = require('chalk');

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

let lampsettings = { 
  "interval" : 2350,
  "status": 0,
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


function print() {
	//console.clear();
	if (lampsettings.status == 0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
	}
	else {
		console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b)('This is a simulated bulb'));
	}
}

function updatestatus(request, response){

    function dmr (err) {
        if (err) {
            console.error(chalk.red('An error ocurred when sending a method response:\n' + err.toString()));
        } else {
            console.log(chalk.green('Response to method \'' + request.methodName + '\' sent successfully.'));
            print();
        }
    }

    if (typeof request.payload == 'undefined' && request.payload) {
        console.log(chalk.red('Invalid interval response received in payload'));
        // Report failure back to your hub.
        response.send(400, 'Invalid direct method parameter: ' + JSON.stringify(request.payload), dmr);
    } else {
        response.send(200, JSON.stringify(lampsettings), dmr);
    }
}

client.onDeviceMethod('getlamp', updatestatus)
