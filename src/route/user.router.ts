import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { errorHandler } from '../middleware/errorHandler';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middleware/verifyToken';
import { User } from '../entity/user';  

const router: Router = Router();
export const userServiceRouter = (app: Router) => {
    const userController: UserController = new UserController();

    app.use('/user', router);

    router.get('/refresh', verifyRefreshTokenMiddleware, errorHandler(userController.refreshToken));

    router.get('/:id', errorHandler(userController.showMyInfo));

    router.post('/', errorHandler(userController.createUser));

    router.post('/token', errorHandler(userController.login));

    router.patch('/mypage', verifyTokenMiddleware, errorHandler(userController.updateInfo));

    router.delete('/logout', verifyTokenMiddleware, errorHandler(userController.logout));

    router.delete('/', verifyTokenMiddleware, errorHandler(userController.cancelMember));
}