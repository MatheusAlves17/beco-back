import { Router } from 'express';

import {
    AuthUserController,
    CreateUserController,
    DetailsUserController
} from './controllers';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me',isAuthenticated,  new DetailsUserController().handle);


export { router };