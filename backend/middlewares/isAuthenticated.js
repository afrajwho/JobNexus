import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated. Token is missing.",
                success: false,
            });
        }

        // Verify the token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token.",
                success: false,
            });
        }

        // Attach user ID to the request object
        req.id = decoded.userId;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "Authentication failed. Please login again.",
            error: error.message || "Unexpected error",
            success: false,
        });
    }
};

export default isAuthenticated;