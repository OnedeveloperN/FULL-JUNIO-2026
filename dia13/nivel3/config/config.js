const config = require('config');

module.exports = {
    port: config.get('port'),
    appName: config.get('app.name'),
    dbName: config.has('db.name') ? config.get('db.name') : undefined,
};