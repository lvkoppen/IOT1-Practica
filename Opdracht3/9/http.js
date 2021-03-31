
const http = require('http')

const data = JSON.stringify({ "deviceId" : 9, "room" : "Home Theather", "helderheid" : 255, "verbindingstype" : "mqtt"})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/lamp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()