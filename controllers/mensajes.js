const { response } = require('express');
const Mensaje = require('../models/mensaje');


const obtenerChat = async(req, res) =>{

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const las30 = await Mensaje.find({
        $or:[{de: miId, para:mensajesDe }, {de:mensajesDe, para: miId }]
    }).sort({createdAt: 'desc'
    }).limit(30);

   await  res.json({
        ok:true,
        mensaje: las30

    });

}

module.exports={
    obtenerChat
}