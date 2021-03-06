'use strict';

var connectionString =
  "HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=service;DeviceId=device-student-22-device-1;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=";

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


