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

function getLampSettings(id) {
  var message = new Message(JSON.stringify("device-student-22-device-" + id))
    console.log("opvragen gegevens van device: device-student-22-device-"+ id)
    send(message)
}


function send(message) {
  client.sendEvent(message, function (err) {
        if (err) {
            console.error('send error: ' + err.toString());
        } else {
            console.log('message sent');
      }
    });
}


function setLampSettings() {
    var message = new Message(JSON.stringify(settings))
    send(message);
};

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Voer lamp ID in om status te checken: ', (answer) => {
            console.log(`Je hebt het volgende ingevuld: ${answer}`)
            getLampSettings(answer);
            resolve()
        })
    })
}

client.onDeviceMethod('confirmation', confirmation)

const main = async () => {
    await question1()
    rl.close()
    
}

function confirmation(request, response) {
    console.log("received confirmation from:");
    if(request.payload.status) {
        console.log("de lamp staat aan");
    } else {
        console.log("De lamp staat uit");
    }
    
    console.log("Sending confirmation to service");
    response.send(200);
}

main()
