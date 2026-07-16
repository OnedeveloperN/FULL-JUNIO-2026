function blockIP(req, res, next) {
  const blockedIP = '192.168.1.100';
  if (req.ip === blockedIP || req.ip === `::ffff:${blockedIP}`) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  next();
}

module.exports = blockIP;