const authMiddleware = (req, res, next) => {
    const { user } = req; // Assuming `user` is attached via JWT middleware
  
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    next();
  };
  
  const roleMiddleware = (req, res, next) => {
    const { user } = req;
    req.isAdmin = user.role === 'admin';
    req.isOwner = user.role === 'owner';
    next();
  };
  
  module.exports = { authMiddleware, roleMiddleware };
  