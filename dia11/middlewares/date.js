function loggerMiddleware(req, res, next) {
    const fecha = new Date().toISOString();
    console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
    next(); 
}

module.exports = loggerMiddleware;