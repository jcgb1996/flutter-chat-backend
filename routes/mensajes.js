/*

path: /api/mensajes
*/
const{ Router } = require('express');
const { ValidarJwt } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajes');


const router = Router();


router.get('/:de', ValidarJwt , obtenerChat);


module.exports = router;
