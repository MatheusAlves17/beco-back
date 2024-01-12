import { Router } from 'express';

import { AuthUserController, CreateUserController } from './controllers';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);


export { router };