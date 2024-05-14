const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
})

io.on('connection', (socket) => {
    console.log(`conexion al websocket creado ${socket.id}`);

    socket.on('Nuevo_mensaje_desde_cliente',(msj)=>{
        console.log("Llego mensaje al serv: "+msj);
        var msj = `${socket.id} : `+msj
        io.emit('Nuevo_mensaje_from_serv',{'texto': msj});//enviando un mensaje a todos los clientes conectados
     });
 
     
     

  });
   
io.on('disconnect',()=>{
    console.log(`usuario desconectado: ${socket.id}`);
})
server.listen(3000,()=>{
console.log("Servidor Iniciado correctamente!!")

})