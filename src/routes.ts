import { Router } from 'express';

import {
    AuthUserController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    DetailsUserController,

    CreateCardController
} from './controllers';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me',isAuthenticated,  new DetailsUserController().handle);
router.put('/user/update',isAuthenticated,  new UpdateUserController().handle);
router.delete('/user/delete',isAuthenticated,  new DeleteUserController().handle);

router.post('/user/card',isAuthenticated,  new CreateCardController().handle);


export { router };