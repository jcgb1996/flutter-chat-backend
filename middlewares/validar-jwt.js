const jwt = require('jsonwebtoken');


const ValidarJwt =(req, res, next)=>{
    const token = req.header('x-token');

    //console.log(token);


    if(!token){
        return res.status(401).json({
            ok:false,
            errors: 'no hay token en la peticion'
         });
    }

    try {
        const {uid} =jwt.verify(token, process.env.JWT_kEY);
        req.uid = uid;




        
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            errors: 'token no valido'
         }); 
    }
}


module.exports = {
    ValidarJwt
}
