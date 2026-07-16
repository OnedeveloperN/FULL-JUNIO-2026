function verify(req, res, next) {
    const apiKey = req.headers['verify-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is required' });
    }
    // Here you would typically verify the API key against a database or a list of valid keys
    next();
}

module.exports = verify;