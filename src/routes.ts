import { Router } from 'express';
import multer from 'multer';

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
    DeleteAddressController,
    SelectAddressController,
    SelectAllAddressController,

    CreateCategoryController,
    SelectCategoryController,
    UpdateCategoryController,
    SelectAllCategoriesController,
    DeleteCategoryController,

    CreateProductController,
    UpdateProductController,
    SelectProductsController
} from './controllers';

import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));


router.post('/user', upload.single('file'), new CreateUserController().handle);
router.post('/user/session', new AuthUserController().handle);
router.put('/user/update', isAuthenticated, new UpdateUserController().handle);
router.get('/user/details', isAuthenticated, new DetailsUserController().handle);
router.delete('/user/delete', isAuthenticated, new DeleteUserController().handle);

router.put('/user/card', isAuthenticated, new UpdateCardController().handle);
router.get('/user/card', isAuthenticated, new SelectCardController().handle);
router.post('/user/card', isAuthenticated, new CreateCardController().handle);
router.get('/user/cards', isAuthenticated, new SelectCardsController().handle);
router.delete('/user/card', isAuthenticated, new DeleteCardController().handle);

router.get('/user/address', isAuthenticated, new SelectAddressController().handle);
router.put('/user/address', isAuthenticated, new UploadAddressController().handle);
router.post('/user/address', isAuthenticated, new CreateAddressController().handle);
router.get('/user/all-address', isAuthenticated, new SelectAllAddressController().handle);
router.delete('/user/address', isAuthenticated, new DeleteAddressController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category/one', isAuthenticated, new SelectCategoryController().handle);
router.put('/category/update', isAuthenticated, new UpdateCategoryController().handle);
router.get('/category/all', isAuthenticated, new SelectAllCategoriesController().handle);
router.delete('/category/delete', isAuthenticated, new DeleteCategoryController().handle);

router.get('/product/all', new SelectProductsController().handle);
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.put('/product', isAuthenticated, upload.single('file'), new UpdateProductController().handle);

export { router };