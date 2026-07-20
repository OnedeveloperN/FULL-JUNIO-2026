function verify(req, res, next) {
    const apiKey = req.headers['verify-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }
    
    next();
}

module.exports = verify;