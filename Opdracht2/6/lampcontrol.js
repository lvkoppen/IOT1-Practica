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


let settings = {
    "interval": 2350,
    "status": 1,
    "alarm": 0,
    "rgb": {
        "r": 255,
        "g": 255,
        "b": 255
    }
}

function setsettingslamp() {

    var message = new Message(JSON.stringify(settings))

    client.sendEvent(message, function (err) {
        if (err) {
            console.error('send error: ' + err.toString());
        } else {
            console.log('message sent');
        }
    });
};

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Zet de lamp aan (1) of uit (0): ', (answer) => {
            console.log(`Je hebt het volgende ingevuld: ${answer}`)
            settings.status = answer
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Zet de lichtsterkte tussen 0 en 255: ', (answer) => {
            console.log(`Je hebt het volgende ingevuld: ${answer}`)
            settings.rgb.r = answer
            settings.rgb.g = answer
            settings.rgb.b = answer
            resolve()
        })
    })
}

client.onDeviceMethod('confirmation', confirmation)

const main = async () => {
    await question1()
    await question2()
    rl.close()
    setsettingslamp()
}

function confirmation(request, response) {
    console.log("received confirmation from:");
    console.log(request.payload);
    console.log("Sending confirmation to service");
    response.send(200);
}

main()
