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
  "status": 0,
  "alarm" : 0,
  "rgb":{
      "r":255,
      "g":255,
      "b":255
  }
};

console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b).underline('This is a simulated dimmable bulb'));

function print() {
	//console.clear();\
	if (lampsettings.status == 0) {
        console.log(chalk.rgb(0, 0, 0).underline('Light is switched off'));
	} else {
        if(lampsettings.alarm == 1){
            console.log(chalk.underline.red("ALARM! LET OP ALARM!"));
        } else {
            console.log(chalk.rgb(lampsettings.rgb.r, lampsettings.rgb.g, lampsettings.rgb.b)('This is a simulated bulb'));
        }
	}
}

function alarm(){
    if(lampsettings.alarm == 1){
        if(lampsettings.status == 0){
            lampsettings.status = 1;
            print()
        } else{
            lampsettings.status = 0;
            print()
        }
    }

}

function setAlarm(){

    if(lampsettings.alarm == 0){
        lampsettings.alarm = 1;
        
    } else {
        lampsettings.alarm = 0;
    }


}

function dmr (err, methodName) {
    if (err) {
        console.error(chalk.red('An error ocurred when sending a method response:\n' + err.toString()));
    } else {
        console.log(chalk.green('Response to method \'' + methodName + '\' sent successfully.'));
        print();
    }
}

function updatestatus(request, response) {
    let r = request;
    let methodName = request.methodName;

    if (typeof r.payload == 'undefined' && r) {
        console.log(chalk.red('Invalid interval response received in payload'));
        // Report failure back to your hub.
        return response.send(400, 'Invalid direct method parameter: ' + JSON.stringify(r), (err) => dmr(err, methodName));
    } else {
        Object.assign(lampsettings, r.payload)
        return response.send(200, lampsettings, (err) => dmr(err, methodName));
    }
}

setInterval(alarm,700)

client.onDeviceMethod('Alarm', setAlarm)
client.onDeviceMethod('setlamp', updatestatus)