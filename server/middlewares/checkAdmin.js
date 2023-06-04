exports.isAdmin = (req, res, next) => {
  if (req.user.permission == 1) return next();
  return res.status(403).json({
    success: false,
    message: 'You do not have permission to perform this action.'
  });
}