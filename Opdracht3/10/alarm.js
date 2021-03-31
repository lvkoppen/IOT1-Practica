
const http = require('http')

let bool = false;



function devicecall(path){


  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'GET',

  }
  
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
  })
  
  req.on('error', error => {
    console.error(error)
  })
  
  req.end()

}


function alarm(){
  if(bool){
    devicecall('/lamp/4/uit')
    devicecall('/lamp/3/aan')
    bool = false
  } else {
    devicecall('/lamp/3/uit')
    devicecall('/lamp/4/aan')
    bool = true
  }
}

setInterval(alarm,500);