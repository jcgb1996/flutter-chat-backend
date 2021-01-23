/*
path: api/usuarios
*/

const{ Router } = require('express');

const { ValidarJwt } = require('../middlewares/validar-jwt');
const{getUsuarios} = require('../controllers/usuarios');

const router = Router();


router.get('/', ValidarJwt , getUsuarios);

//post
//validar email, password


module.exports = router;