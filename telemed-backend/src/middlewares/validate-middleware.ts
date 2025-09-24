
// import { Request, Response, NextFunction } from 'express';
// import { z } from 'zod';

// export const validateBody = (schema: z.ZodSchema<any>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req.body);
    
//     if (!result.success) {
//       const errorMessages = result.error.issues.map(err => ({
//         field: err.path.join('.'),
//         message: err.message
//       }));
      
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errorMessages
//       });
//     }
    
//     // Replace req.body with validated data
//     req.body = result.data;
//     next();
//   };
// };

// export const validateParams = (schema: z.ZodSchema<any>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req.params);
    
//     if (!result.success) {
//       const errorMessages = result.error.issues.map(err => ({
//         field: err.path.join('.'),
//         message: err.message
//       }));
      
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid parameters',
//         errors: errorMessages
//       });
//     }
    
//     req.params = result.data;
//     next();
//   };
// };

// export const validateQuery = (schema: z.ZodSchema<any>) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req.query);
    
//     if (!result.success) {
//       const errorMessages = result.error.issues.map(err => ({
//         field: err.path.join('.'),
//         message: err.message
//       }));
      
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid query parameters',
//         errors: errorMessages
//       });
//     }
    
//     req.query = result.data;
//     next();
//   };
// };


// validate-middleware.ts (fixed)
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateBody = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const errorMessages = result.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }
    
    // Replace req.body with validated data
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    
    if (!result.success) {
      const errorMessages = result.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters',
        errors: errorMessages
      });
    }
    
    // Replace req.params with validated data
    Object.keys(req.params).forEach(key => delete req.params[key]);
    Object.assign(req.params, result.data);
    next();
  };
};

export const validateQuery = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    
    if (!result.success) {
      const errorMessages = result.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errorMessages
      });
    }
    
    // Don't reassign req.query directly - instead, create a new object
    // and let Express handle the query parsing
    (req as any).validatedQuery = result.data;
    next();
  };
};