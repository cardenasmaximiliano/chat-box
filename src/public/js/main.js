console.log("funciona todo?")

const socket = io();

let user;

const chatBox = document.getElementById("chatBox");

swal.fire({ //configuracion
    title: "identificate",
    input:"text",
    text: "ingresa con tu usuario para entrar al chat",
    inputValidator: (value) =>{
        //vamos a ingresar un valor que deberiamos retornar
        return !value && "escribi algo para continuar"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
})



chatBox.addEventListener("keyup",(event)=>{

    if(event.key === "Enter"){
        //trim => eliminar espacios tanto adelante como atras
        if(chatBox.value.trim().length > 0) //aca indicamos que si hay mas de un un elemento quiere decir que esta ocupado por un string
        {
            socket.emit("message",{user:user, message: chatBox.value})
            chatBox.value = "";
        }
    }

})

//vamos a trabajr la vista de los mensajes

socket.on("messagesLogs", data =>{
    const log = document.getElementById("messagesLogs");
    let messages;
    data.forEach(message => {
            messages = messages + `${message.user} dice: ${message.message} <br>`

    });
    log.innerHTML = messages;
})