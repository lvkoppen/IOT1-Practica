const express = require('express');
var Client = require('azure-iothub').Client;

const connectionstring = "HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=7c3SGtU21s8fUjcSGMMjXsO5sebBaPu2ix9Zg1Pj/I4="
var client = Client.fromConnectionString(connectionstring);

var mqtt = require('mqtt')
var mqttclient  = mqtt.connect('mqtt://broker.mqttdashboard.com')


let devices = [
    { "deviceId" : 1, "room" : "Living Room", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 2, "room" : "Living Room", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 3, "room" : "Bedroom", "helderheid" : 255, "verbindingstype" : "iothub"},
    { "deviceId" : 4, "room" : "Bathroom", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 5, "room" : "Game Room", "helderheid" : 255, "verbindingstype" : "mqtt"},
]



const app = express();
app.use(express.json())


app.get("/lampen", (req, res) => {
    res.json(devices);
});

app.get("/lamp/:id", (req, res) => {
    var id = req.params.id;

    for (var device of devices){
        if(device.deviceId == id){          
            return res.json(device);
        }
    }
    return res.status(404).send("Device not found!");
});

app.patch("/lamp/:id", (req,res) => {
    const lamp = devices.find(device => device.deviceId == parseInt(req.params.id));

    if(!lamp){
        return res.status(404).json({ message: 'Not Found' });
    }
    lamp.helderheid = parseInt(req.body.helderheid);
    res.json(lamp);
});

app.post("/lamp", (req,res) => {

    if(devices.some(device => device.deviceId == parseInt(req.body.deviceId))){
        return res.status(422).json({ message: "Entity can't be added, it already exists" });
    }
    const lamp = req.body
    devices.push(lamp)
    res.status(201).json(lamp);

});

app.delete("/lamp/:id", (req,res) => {

    if(!devices.some(device => device.deviceId == parseInt(req.params.id))){
        return res.status(404).json({ message: 'Not Found' });
    }

    devices = devices.filter(element => element.deviceId != req.params.id)
    res.status(200).json({ message: "Deleted device: " + req.params.id});

});


app.get("/lamp/:id/aan", (req, res) => {
    if(!devices.some(device => device.deviceId == parseInt(req.params.id))){
        return res.status(404).json({ message: 'Not Found' });
    }
    const lamp = devices.find(device => device.deviceId == parseInt(req.params.id));
    settings = { 
        "status": 1,
        "alarm" : 0,
        "rgb":{
            "r":255,
            "g":255,
            "b":255
        }
    }
    if(lamp.verbindingstype == 'mqtt'){
        mqttclient.publish('lamp/'+ lamp.deviceId + '/aan', JSON.stringify(settings))
    }
    if(lamp.verbindingstype == 'iothub'){
        lampbeweging(settings, lamp.deviceId)
    }
    
    res.json({message : "lamp is aangezet"});
});

app.get("/lamp/:id/uit", (req, res) => {
    if(!devices.some(device => device.deviceId == parseInt(req.params.id))){
        return res.status(404).json({ message: 'Not Found' });
    }
    const lamp = devices.find(device => device.deviceId == parseInt(req.params.id));
    settings = { 
        "status": 1,
        "alarm" : 0,
        "rgb":{
            "r":255,
            "g":255,
            "b":255
        }
    }
    if(lamp.verbindingstype == 'mqtt'){
        mqttclient.publish('lamp/'+ lamp.deviceId + '/uit', JSON.stringify(settings))
    }
    if(lamp.verbindingstype == 'iothub'){
        lampbeweging(settings, lamp.deviceId)
    }
    
    res.json({message : "lamp is uitgezet"});
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


function lampbeweging(settings, id){
  var deviceId = 'device-student-22-device-' + id;
  var methodParams = {
      methodName: 'setlamp',
      payload: settings,
      responseTimeoutInSeconds: 30
  }

  sendMessage(deviceId, methodParams);
}


function sendMessage(deviceId, methodParams, successMethod = () => {}) {
  client.invokeDeviceMethod(deviceId, methodParams, (err, result) => {
    if(err) {
      console.log("failed to send message to " + deviceId + " with function " + methodParams.methodName);
    } else {
      console.log("Succesfully send message to " + deviceId + " with function " + methodParams.methodName);
      console.log(methodParams.payload);
      successMethod();
    }
  });
}