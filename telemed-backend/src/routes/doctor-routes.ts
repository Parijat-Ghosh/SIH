// import express from 'express';
// import doctorController from '../controllers/doctor-controller';
// import { authenticateToken } from '../middlewares/auth-middleware';  // Fixed: matches your existing pattern
// import { validateBody, validateQuery } from '../middlewares/validate-middleware';  // Fixed: matches your existing pattern
// import { 
//     doctorValidation,
//     searchDoctorsQuerySchema 
// } from '../utils/validation';  // Fixed: matches your existing pattern
// import { Router } from 'express';

// const router = Router();

// // Public routes
// router.post('/register', 
//     validateBody(doctorValidation.signup), 
//     doctorController.register
// );

// router.post('/login', 
//     validateBody(doctorValidation.login), 
//     doctorController.login
// );

// router.get('/all', 
//     validateQuery(searchDoctorsQuerySchema), 
//     doctorController.getAllDoctors
// );

// // Protected routes (require doctor authentication)
// router.get('/profile', 
//     authenticateToken,  // Fixed: matches your existing function name
//     doctorController.getProfile
// );

// router.put('/profile', 
//     authenticateToken,  // Fixed: matches your existing function name
//     validateBody(doctorValidation.profileUpdate),
//     doctorController.updateProfile
// );

// export default router;

// // doctor-routes.ts (updated)
// import express from 'express';
// import doctorController from '../controllers/doctor-controller';
// import { authenticateDoctor } from '../middlewares/doctor-auth-middleware';  // Updated
// import { validateBody, validateQuery } from '../middlewares/validate-middleware';
// import { 
//     doctorValidation,
//     searchDoctorsQuerySchema 
// } from '../utils/validation';
// import { Router } from 'express';

// const router = Router();

// // Public routes
// router.post('/register', 
//     validateBody(doctorValidation.signup), 
//     doctorController.register
// );

// router.post('/login', 
//     validateBody(doctorValidation.login), 
//     doctorController.login
// );

// router.get('/all', 
//     validateQuery(searchDoctorsQuerySchema), 
//     doctorController.getAllDoctors
// );

// // Protected routes (require doctor authentication)
// router.get('/profile', 
//     authenticateDoctor,  // Updated
//     doctorController.getProfile
// );

// router.put('/profile', 
//     authenticateDoctor,  // Updated
//     validateBody(doctorValidation.profileUpdate),
//     doctorController.updateProfile
// );

// export default router;



// doctor-routes.ts - temporary fix (remove validation)
import express from 'express';
import doctorController from '../controllers/doctor-controller';
import { authenticateDoctor } from '../middlewares/doctor-auth-middleware';
import { validateBody } from '../middlewares/validate-middleware';
import { 
    doctorValidation
} from '../utils/validation';
import { Router } from 'express';

const router = Router();

// Public routes
router.post('/register', 
    validateBody(doctorValidation.signup), 
    doctorController.register
);

router.post('/login', 
    validateBody(doctorValidation.login), 
    doctorController.login
);

// Remove validation temporarily - just use the controller directly
router.get('/all', doctorController.getAllDoctors);

// Protected routes
router.get('/profile', 
    authenticateDoctor,
    doctorController.getProfile
);

router.put('/profile', 
    authenticateDoctor,
    validateBody(doctorValidation.profileUpdate),
    doctorController.updateProfile
);

export default router;