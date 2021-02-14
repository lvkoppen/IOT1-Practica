var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com')


client.on('connect', function () {
    client.subscribe('iotpractica/send', function (err) {
      if (client.connected==true) {
        client.publish('iotpractica', 'Hoi ik ben hier om te versturen')
      }
      else{
          console.log('not connected')
      }
    })
  })

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
  })