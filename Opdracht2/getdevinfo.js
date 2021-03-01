

var iothub = require('azure-iothub');
 
var connectionString = 'HostName=DelftIotHubPracticum2021.azure-devices.net;SharedAccessKeyName=registryRead;SharedAccessKey=vN5Jxzq/qwQXnfgWj6derhUod4nGeG6PgvZ7ijpMEYw=';
 
var registry = iothub.Registry.fromConnectionString(connectionString);
 
let deviceKeys = ["device-student-22-device-1", "device-student-22-device-2", "device-student-22-device-3","device-student-22-device-4","device-student-22-device-5" ]

deviceKeys.forEach(element=>{
    registry.get(element, function(err, deviceInfo, res) {
        if (err) console.log(' error: ' + err.toString());
        if (res) console.log(' status: ' + res.statusCode + ' ' + res.statusMessage);
        if (deviceInfo) console.log(' device info: ' + JSON.stringify(deviceInfo));
    });
})

