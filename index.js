const fs = require('fs')
const express = require('express')
const app = express()
const wsIns = require('express-ws')(app)


app.ws('/', ws => {
  ws.on('message', data => {
    console.log(data)
    wsIns.getWss().clients.forEach(server => {
      if (server !== ws) {
        console.log('send ...')
        server.send(data)
      }
    })
  })
})

app.get('/', (req, res, next) => {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.write('error ...')
      res.end()
    } else {
      res.writeHeader(200,{'content-type' : 'text/html;charset="utf-8"'})
      res.write(data)
      res.end()
    }
  })
})

app.listen(5001, () => {
  console.log('runing 5001 ..')
})