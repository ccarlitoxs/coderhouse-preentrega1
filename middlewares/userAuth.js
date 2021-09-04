const userAuth = (req,res,next) => {
    if (req.headers['user']==='administrador' || req.headers['user']==='usuario') {
        next()
    } else {
        console.log(req);
        res.json({error:-1,descripcion:`ruta ${req.originalUrl} metodo ${req.method} no autorizada`});
    }
    
}
 
export default userAuth;