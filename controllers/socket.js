const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById(uid);

    usuario.onLine = true;

    await usuario.save();

    return usuario;


}


const usuarioDesconectado = async (uid = '') => {

    //print(uid);

    const usuario = await Usuario.findById(uid);

    usuario.onLine = false;

    await usuario.save();

    return usuario;


}

const grabarMensaje = async(payload)=>{

        /*
            {
                de: ''
                para: ''
                texto: ''
            }
        */

        //console.log(payload);

        try {   
            const mensaje = Mensaje(payload);
            await mensaje.save();

            return true;
        } catch (error) {

            return false;
        }


}


module.exports = {

    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}