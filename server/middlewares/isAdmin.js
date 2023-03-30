exports.isAdmin = (req, res, next) => {
    // check if usertype is admin
    if(req.user.role!=="admin"){
        return res.status(403).json({ message: `This operation requires an admin user` });
    }
    next();
};