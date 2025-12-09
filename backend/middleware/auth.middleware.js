export const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  } else {
    return res.status(403).json({ message: "Unauthorized. Please log in." });
  }
};
