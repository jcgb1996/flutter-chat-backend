
const { comprobarJwt } = require('../helpers/jwt');
const {io} = require('../index')
const { usuarioConectado, usuarioDesconectado, grabarMensaje } =require('../controllers/socket')


//mensaje de sockets
io.on('connection', client => {
    console.log('Cliente conectado'); 


    client.on('disconnect', () => { 
        console.log('Cliente Desconectado'); 
        usuarioDesconectado(uid);
      });

    //console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJwt(client.handshake.headers['x-token']);  //comprobarJwt(client.handshake.headers['x-token']); 
    console.log(valido, uid);

    //validar autenticado
    if(! valido){ return client.disconnect();  }

    //Cliente autenticado
    usuarioConectado(uid);
    
    //ingrear al usuario a una sala en especifico
    //sala global donde estan todos los clientes conectados
    //client id le envia los mensajes providos 
    client.join(uid); //se una persona a una sala (Nombre de la sala)
    //client.to(uid); //enviar a una persona 

    client.on('mensaje-personal', async (payload)=>{ 

         //TODO: grabar mensaje
         await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
       
    });
    


    client.on('mensaje', (payload)=>{ 
        
       
    });
});