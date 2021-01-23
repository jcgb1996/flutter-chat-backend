/*
path: api/login
*/

const{crearUsuario, login, renewToken} = require('../controllers/auth');
const{ Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidarJwt } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos

],crearUsuario);


router.post('/', [

    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos

],login);


router.get('/renew', ValidarJwt ,renewToken);

//post
//validar email, password


module.exports = router;