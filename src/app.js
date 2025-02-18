//type:module indica que se utilizar modulos de ecma6.

import express from "express";
import{engine} from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 4545;

//los middleware son funciones que se ejecutan entre la solicitud (request) del cliente y la respuesta (response) del servidor de la aplicacion.

app.use(express.json())
app.use(express.urlencoded({extended:true})) //esto va avisar que vamos a estar recibiendo varios datos complejos desde el cliente
app.use(express.static("./src/public"));

//configuramos handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

//vamos a abrir un canal de comunicacion con websocket, nos va a permitir simular un chat online
// portales de ntoicias, videojuegos, subastas, trading, apuestas online.

//instancias socket io.



//crear unas rutas

app.get("/", (req,res)=>{
    res.render("index")
})

const httpServer = app.listen(PUERTO, ()=>{
    console.log(`estamos escuchando el puerto: ${PUERTO}`)
})

const io = new Server(httpServer);

let messages = [];

io.on("connection",(socket)=>{
    console.log("usuario conectado...")

    socket.on("message", data =>{ //recibir el mensaje que se de por el front
        messages.push(data)


        //emitir un mesnaje para el cliente con todo el array de datos
        socket.emit("messagesLogs", messages)

    })

})