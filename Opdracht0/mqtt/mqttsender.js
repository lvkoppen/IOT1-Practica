var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('iotpractica/send', function (err) {
      if (client.connected==true) {
        console.log('connected')
      }
      else{
          console.log('not connected')
      }
    })
  })

client.on('message', function (topic, message) {
    console.log(message.toString())
    client.publish('iotpractica/receive', 'Hallo dit is een bericht voor de mqtt receiver')
  })


