import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please login.",
        success: false,
      });
    }

    try {
      // Verify token synchronously since jwt.verify is already Promise-based
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      
      // Add user data to request object
      req.user = {
        userId: decoded.userId,
        // Add other relevant user data from token if needed
      };
      
      return next();
      
    } catch (tokenError) {
      // Handle specific JWT errors
      if (tokenError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: "Token has expired. Please login again.",
          success: false,
        });
      }
      
      if (tokenError instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: "Invalid token. Please login again.",
          success: false,
        });
      }
      
      throw tokenError; // Re-throw unexpected errors
    }
    
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
    });
  }
};

export default isAuthenticated;