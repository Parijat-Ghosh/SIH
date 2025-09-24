// doctor-auth-middleware.ts
import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

// Extend Request interface for doctor
declare global {
  namespace Express {
    interface Request {
      doctor?: {
        doctorId: string;
        phoneNumber: string;
        userType: string;
      };
    }
  }
}

export const authenticateDoctor = (req: Request, res: Response, next: NextFunction) => {
  console.log('🔍 Doctor Auth middleware called!');
  
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ No auth header found');
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }
    
    let token: string;
    
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = authHeader;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    const JWT_SECRET = 'my-simple-secret-key-123';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if it's a doctor token
    if (decoded.userType !== 'doctor') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token type - doctor access required'
      });
    }
    
    if (!decoded.doctorId || !decoded.phoneNumber) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token structure'
      });
    }
    
    req.doctor = {
      doctorId: decoded.doctorId,
      phoneNumber: decoded.phoneNumber,
      userType: decoded.userType
    };
    
    console.log('✅ Doctor set in request:', req.doctor);
    next();

  } catch (error: any) {
    console.log('❌ JWT verification error:', error.message);
    return res.status(401).json({
      success: false,
      message: `Token verification failed: ${error.message}`
    });
  }
};