let requestCount = 0;

function counter(req, res, next) {
  requestCount++;
  console.log(`Total de solicitudes: ${requestCount}`);
  next();
}

module.exports = counter;

