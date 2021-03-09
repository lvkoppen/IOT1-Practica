'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-device').Message;



const { EventHubConsumerClient } = require("@azure/event-hubs");


const connectionString = `Endpoint=sb://iothub-ns-delftiothu-8528485-c734b6e251.servicebus.windows.net/;EntityPath=delftiothubpracticum2021;SharedAccessKeyName=service;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=`;

var printError = function (err) {
    console.log(err.message);
  };

  var printMessages = function (messages) {
    for (const message of messages) {
      console.log("Telemetry received: ");
      console.log(JSON.stringify(message.body));
      console.log("Properties (set by device): ");
      console.log(JSON.stringify(message.properties));
      console.log("System properties (set by IoT Hub): ");
      console.log(JSON.stringify(message.systemProperties));
      console.log("");
    }
  };

  async function main() {
    console.log("IoT Hub Quickstarts - Read device to cloud messages.");
  
    
    const clientOptions = {

    };
  
    // Create the client to connect to the default consumer group of the Event Hub
    const consumerClient = new EventHubConsumerClient("$Default", connectionString, clientOptions);
  
    // Subscribe to messages from all partitions as below
    // To subscribe to messages from a single partition, use the overload of the same method.
    consumerClient.subscribe({
      processEvents: printMessages,
      processError: printError,
    });
  }
  
  main().catch((error) => {
    console.error("Error running sample:", error);
  });
  