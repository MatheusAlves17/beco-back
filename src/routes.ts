import { Router } from 'express';

import {
    AuthUserController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    DetailsUserController,

    CreateCardController,
    DeleteCardController,
    UpdateCardController,
    SelectCardController,
    SelectCardsController,

    CreateAddressController,
    UploadAddressController,
} from './controllers';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/user/session', new AuthUserController().handle);
router.put('/user/update',isAuthenticated,  new UpdateUserController().handle);
router.get('/user/details',isAuthenticated,  new DetailsUserController().handle);
router.delete('/user/delete',isAuthenticated,  new DeleteUserController().handle);

router.put('/user/card',isAuthenticated,  new UpdateCardController().handle);
router.get('/user/card',isAuthenticated,  new SelectCardController().handle);
router.post('/user/card',isAuthenticated,  new CreateCardController().handle);
router.get('/user/cards',isAuthenticated,  new SelectCardsController().handle);
router.delete('/user/card',isAuthenticated,  new DeleteCardController().handle);

router.post('/user/address',isAuthenticated,  new CreateAddressController().handle);
router.put('/user/address',isAuthenticated,  new UploadAddressController().handle);


export { router };