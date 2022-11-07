import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { auth } from '../middlewares/auth';
import UserValidator from '../validator/UserValidator';

const router = Router();

const authController = new AuthController();
const userValidator = new UserValidator();

router.post('/register', userValidator.userCreateValidator, authController.register);
router.post('/email-exists', userValidator.checkEmailValidator, authController.checkEmail);
router.post('/login', userValidator.userLoginValidator, authController.login);
router.post('/refresh-token', authController.refreshTokens);
router.post('/logout', authController.logout);
router.put(
    '/change-password',
    auth(),
    userValidator.changePasswordValidator,
    authController.changePassword
);

export default router;
