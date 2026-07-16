function tokenMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }
    
    next();
}

module.exports = tokenMiddleware;