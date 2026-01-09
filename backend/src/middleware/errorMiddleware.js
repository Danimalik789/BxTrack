const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  if (res.headersSent) {
    return;
  }

  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
};

module.exports = errorMiddleware;
