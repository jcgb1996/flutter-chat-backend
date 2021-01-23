const{ response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response)=> {

        const{email, password} = req.body;

        try {
            const existeEmail = await Usuario.findOne({email});

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg:"el correo ya esta registrado",
                });
            }

            const usuario = new Usuario(req.body);
            //encriptar contraseña
            
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            await  usuario.save();
            
            //generar Token
            const token = await generarJWT(usuario.id);

             res.json({
                 ok: true,
                 usuario,
                 token

                });


        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Hable con el admin'
            });
        }
   
        
}

const login = async (req, res = response)=> {

    const{email, password} = req.body;

    

    try {
        
    const existeEmail = await Usuario.findOne({email});

        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg:"Correo no encontrado",
            });
        }
    
        const valiPassword = bcrypt.compareSync(password, existeEmail.password )

        if(!valiPassword){
            return res.status(400).json({
                ok: false,
                msg:"la contraseña no es valida",
            });
        }

        //generar JWT
        const token  = await generarJWT( existeEmail.id );

        res.json({
            ok: true,
            usuario: existeEmail,
            token

           });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }
}


const renewToken = async(req, res = response) =>{
    //const uid del usuario
    const uid = req.uid;

    //generar nuevo jwt
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);


   return  res.status(200).json({
        ok:true,
        usuario,
        token
    });
}


module.exports = {
    crearUsuario, 
    login,
    renewToken
}