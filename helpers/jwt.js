const jwt = require('jsonwebtoken');


const generarJWT= (uid)=>{

       return new Promise( (resolve, reject) => {

                const payLoad = { uid };
                jwt.sign( payLoad, process.env.JWT_kEY, {
                    expiresIn: '24h',
                } , (err, token)=>{  
                        if(err){
                                //no se pudo crear el token
                                reject('no se pudo generar el token');
                        }else{
                            resolve( token );
                        }
                    
                } )
       } );


}

module.exports = {
    generarJWT

}