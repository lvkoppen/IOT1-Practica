'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-device').Message;

const { EventHubConsumerClient } = require("@azure/event-hubs");

const connectionString = `Endpoint=sb://iothub-ns-delftiothu-8528485-c734b6e251.servicebus.windows.net/;EntityPath=delftiothubpracticum2021;SharedAccessKeyName=service;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=`;

var printError = function (err) {
    console.log(err.message);
  };
const devices = ["device-student-22-device-1", "device-student-22-device-2", "device-student-22-device-3","device-student-22-device-4","device-student-22-device-5" ]
  var printMessages = function (messages) {
    for (const message of messages) {
      if(devices.includes(message.systemProperties["iothub-connection-device-id"])){
        console.log("Telemetry received: ");
        console.log(JSON.stringify(message.body));
        console.log("Properties (set by device): ");
        console.log(JSON.stringify(message.properties));
        console.log("System properties (set by IoT Hub): ");
        console.log(JSON.stringify(message.systemProperties));
        console.log("");
      }

    }
  };

  async function main() {
    console.log("IoT Hub Quickstarts - Read device to cloud messages.");
  
    
    const clientOptions = {

    };

    const consumerclient = new EventHubConsumerClient("$Default", connectionString, clientOptions);

    consumerclient.subscribe({
      processEvents: printMessages,
      processError: printError,
    });
  }
  
  main().catch((error) => {
    console.error("Error running sample:", error);
  });
  