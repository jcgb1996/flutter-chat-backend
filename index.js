const express = require('express');
const path = require('path');
require('dotenv').config();

//db config
const {  dbConnection } =  require('./databes/config').dbConnection();

//app de express
const app = express();




//lectura y parceo del body peticion HTTP
app.use( express.json() );


//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./socket/socket')




const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//mis rutas
app.use(  '/api/login', require('./routes/auth') );


server.listen(process.env.PORT, (err)=>{
        if(err)  {
            throw new Error(error);
        }
        console.log('servidor corriendo en el puerto', process.env.PORT);
});