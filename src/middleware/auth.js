const userauth = async (req, res, next) => {
    try{

            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.json({ success:false, message: "Not authorized"});
            }else{
                 const decoded = jwt.verify(token, process.env.SECRET);
                 req.user = decoded;
                 next();
            }
    
    }catch(error){
        res.json({ error: true, message: "Internal server error"});
    }

}


const adminauth = (req, res, next) => {
    if(req.user.user_type === 'admin'){
        next()
    }else{
        res.json({success: false, message: "Unauthorized"})
    }
}

module.exports = {
    userauth,
    adminauth
}