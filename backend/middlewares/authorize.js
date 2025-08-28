export const authorize = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (req.user.role !== allowedRole) {
      return res.status(403).json({ message: "Forbidden: Access Denied" });
    }
    next();
  };
};
