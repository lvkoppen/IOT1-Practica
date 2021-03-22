'use strict';


const deviceId = "device-student-22-device-1";
const sas = "ff2aanu0rv7UfoGB1b8NFT2Sp0qRlbJcS/t314PBtd0=";

const connectionString = `HostName=DelftIotHubPracticum2021.azure-devices.net;DeviceId=${deviceId};SharedAccessKey=${sas};`

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;
const readline = require('readline');

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('message', (msg) => {
  msg = JSON.parse(msg.getData());
      console.log(msg);
});

rl.on('line', (input) => {
  console.log("Er is beweging geconstateerd");

  var message = new Message(JSON.stringify({beweging: true}))

  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
    }
  });
});

