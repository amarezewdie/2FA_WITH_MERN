const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated) return next();
  return res.json({ success: false, message: "un auth" });
};

export default authMiddleware;
