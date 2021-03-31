const chalk = require('chalk');

deviceId = 1;


var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('lampen/#', function (err) {
        if (client.connected==true) {
            console.log('connected')
        }
    });
    client.subscribe('lamp/' + deviceId + "/#", function (err) {
        if (client.connected==true) {
            console.log('connected')
        }

    });
  });

let lampsettings = {
  "status": 0,
  "alarm" : 0,
  "rgb":{
      "r":255,
      "g":255,
      "b":255
  }
}

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



function aan(){
    lampsettings.status = 1;
    print();
}

function uit(){
    lampsettings.status = 0
    print();
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

client.on('message', function (topic, message) {
    if(topic == 'lamp/1/aan'){aan()}
    if(topic == 'lamp/1/uit'){uit()}
    if(topic == 'lampen/alarm'){setAlarm()}
    
});

setInterval(alarm,700)