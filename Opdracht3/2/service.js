const express = require('express');

let devices = [
    { "deviceId" : 1, "room" : "Living Room", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 2, "room" : "Living Room", "helderheid" : 255, "verbindingstype" : "iothub"},
    { "deviceId" : 3, "room" : "Bedroom", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 4, "room" : "Bathroom", "helderheid" : 255, "verbindingstype" : "mqtt"},
    { "deviceId" : 5, "room" : "Game Room", "helderheid" : 255, "verbindingstype" : "mqtt"},
]

const app = express();



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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});