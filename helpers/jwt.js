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
const comprobarJwt = (token = '') => {

    try {
        const {uid} =jwt.verify(token, process.env.JWT_kEY);
        //req.uid = uid;
        return [true, uid];
    } catch (error) {
        return [false, null];
    }

}

module.exports = {
    generarJWT,
    comprobarJwt
}