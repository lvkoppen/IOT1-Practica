// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       /@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@            ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@                             .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@                                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@                                        @@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@                                            @@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@                @@@@@@@@@@@@@@@@@@@.              @@@@@@@@@@@@@@@@@@@@@@
// @@@@@@                  @@@@             *@@@@              @@@@@@@@@@@@@@@@@@@@
// @@@                        @@@*             @@@@               @@@@@@@@@@@@@@@@@
// @                            @@@@             ,@@@@              @@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@               @@@              @@@@                         #@
// @@@@@@@@@@@@@@@@@@@@              @@@@             .@@@@                    @@@@
// @@@@@@@@@@@@@@@@@@@@@@               @@@@@@@@@@@@@@@@@@@@@               .@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@,               @@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@                                         ,@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@&                                    @@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                @@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                     .@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// G E K O L O N I S E E R D <3 ~ Mintal

'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-device').Message;
const fs = require('fs')

const { EventHubConsumerClient } = require("@azure/event-hubs");

const connectionString = `Endpoint=sb://iothub-ns-delftiothu-8528485-c734b6e251.servicebus.windows.net/;EntityPath=delftiothubpracticum2021;SharedAccessKeyName=service;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4=`;


const cconnectionstring = "HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4="
var client = Client.fromConnectionString(cconnectionstring);

client.open();

var printError = function (err) {
    console.log(err.message);
};

const devices = ["device-student-22-device-1", "device-student-22-device-2", "device-student-22-device-3", "device-student-22-device-4", "device-student-22-device-5"]
const lamps = ["device-student-22-device-3", "device-student-22-device-4"];
const bewegingsensoren = ["device-student-22-device-1", "device-student-22-device-2"];

var printMessages = function (messages) {
    for (const message of messages) {
        let id = message.systemProperties["iothub-connection-device-id"];

        if (devices.includes(id)) {
            if (bewegingsensoren.includes(id)) {
                lampbeweging(id, message.body)
            }
        }
    }
};

async function main() {
    console.log("IoT Hub Quickstarts - Read device to cloud messages.");

    const clientOptions = {

    };
    const consumerclient = new EventHubConsumerClient("9", connectionString, clientOptions);

    consumerclient.subscribe({
        processEvents: printMessages,
        processError: printError,
    });
}

main().catch((error) => {
    console.error("Error running sample:", error);
});

function lampbeweging(id, payload) {
    var methodParams = {
        methodName: 'setlamp',
        payload: payload,
        responseTimeoutInSeconds: 30
    }

    lamps.forEach(lamp => {
        sendMessage(lamp, methodParams);
    });
}

function messageToControl(id, payload) {

    var methodParams = {
        methodName: 'confirmation',
        payload: { "lampId": payload.Id, "calledFunction": payload.calledFunction },
        responseTimeoutInSeconds: 30
    };

    sendMessage(id, methodParams);
}

function sendMessage(deviceId, methodParams) {
    return client.invokeDeviceMethod(deviceId, methodParams, (err, result) => {
        if (err) {
            console.log("failed to send message to " + deviceId + " with function " + methodParams.methodName);
            console.error(err.message);
        } else {
            console.log("Succesfully send message to " + deviceId + " with function " + methodParams.methodName);
            console.log(methodParams.payload);
        }
    });
}
