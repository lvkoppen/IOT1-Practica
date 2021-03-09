// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

// The device connection string to authenticate the device with your IoT hub.
//
// NOTE:
// For simplicity, this sample sets the connection string in code.
// In a production environment, the recommended approach is to use
// an environment variable to make it available to your application
// or use an HSM or an x509 certificate.
// https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
//
// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
var connectionString =
  "HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=service;DeviceId=device-student-22-device-1;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=";

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
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


