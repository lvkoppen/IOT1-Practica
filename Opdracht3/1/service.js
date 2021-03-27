const express = require('express');


let devices = [
    { "deviceId" : 1, "room" : "Living Room"},
    { "deviceId" : 2, "room" : "Living Room"},
    { "deviceId" : 3, "room" : "Bedroom"},
    { "deviceId" : 4, "room" : "Bathroom"},
    { "deviceId" : 5, "room" : "Game Room"},
]

const app = express();


app.get("/lampen", (req, res) => {
    res.json(devices);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});