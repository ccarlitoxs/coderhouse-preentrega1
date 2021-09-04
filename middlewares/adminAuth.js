const adminAuth = (req,res,next) => {
    if (req.headers['user']!=='administrador') {
        res.json({error:-1,descripcion:`ruta ${req.originalUrl} metodo ${req.method} no autorizada`});
    } else {
        next();
    }
    
}
 
export default adminAuth;