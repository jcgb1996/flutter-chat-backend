const {response}= require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) =>{

    const desde = Number( req.query.desde ) || 0;
    const usuario = await  Usuario
        .find({  _id: { $ne: req.uid } })
        .sort('-onLine')
        .skip(desde)
        .limit(20)

   res.json({
       ok: true,
       usuario,
       desde
   });

}


module.exports ={

    getUsuarios,

}