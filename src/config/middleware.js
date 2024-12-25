const middleware = (req, res, next) => {
  if (
    req.query.key !== process.env.API_KEY ||
    req.headers.authorization !== process.env.AUTHORIZATION_TOKEN
  ) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "Unauthorized",
      },
    });
  }
  return next();
};

export { middleware };
