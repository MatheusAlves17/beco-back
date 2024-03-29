import { Request, Response, Router } from 'express';
import multer from 'multer';

import {
    AuthUserController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    DetailsUserController,
    UpdatePasswordController,
    SelectAllUsersController,
    UpdateActivityUserController,

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
    DeleteProductController,
    SelectProductController,
    SelectProductsController,

    CreateStatusController,
    UpdateStatusController,
    DeleteStatusController,
    SelectStatusController,
    SelectAllStatusController,

    CreateOrderController,
    UpdateOrderController,
    SelectAllOrdersController,
    SelectOrderController,

    CreateItemController,

    CreateCouponController,
    UpdateCouponController,
    SelectMyCouponsController,
    SelectValidCouponsController,
} from './controllers';

import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer';
import { UpdateItemController } from './controllers/item/UpdateItemController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

router.get('/', (req: Request, res: Response) => res.send('PROJETINHO TÁ AFIADO!'))


// router.post('/user', upload.single('file'), new CreateUserController().handle);
router.post('/user/signup', new CreateUserController().handle);
router.post('/user/session', new AuthUserController().handle);
router.put('/user/update', isAuthenticated, new UpdateUserController().handle);
router.put('/user/update/password', isAuthenticated, new UpdatePasswordController().handle);
router.delete('/user/delete', isAuthenticated, new DeleteUserController().handle);
router.get('/user/details', isAuthenticated, new DetailsUserController().handle);
router.get('/users/all', new SelectAllUsersController().handle);
router.put('/users/update-active', new UpdateActivityUserController().handle);

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

router.get('/product/one', new SelectProductController().handle);
router.get('/product/all', new SelectProductsController().handle);
router.delete('/product', isAuthenticated, new DeleteProductController().handle);
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.put('/product', isAuthenticated, upload.single('file'), new UpdateProductController().handle);

router.put('/status', isAuthenticated, new UpdateStatusController().handle);
router.post('/status', isAuthenticated, new CreateStatusController().handle);
router.delete('/status', isAuthenticated, new DeleteStatusController().handle);
router.get('/status/one', isAuthenticated, new SelectStatusController().handle);
router.get('/status/all', isAuthenticated, new SelectAllStatusController().handle);

router.put('/order', isAuthenticated, new UpdateOrderController().handle);
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.get('/order/one', isAuthenticated, new SelectOrderController().handle);
router.get('/order/all', isAuthenticated, new SelectAllOrdersController().handle);

router.post('/item', isAuthenticated, upload.single('file'), new CreateItemController().handle);
router.put('/item', isAuthenticated, new UpdateItemController().handle);


router.post('/coupon', isAuthenticated, new CreateCouponController().handle);
router.put('/coupon', isAuthenticated, new UpdateCouponController().handle);
router.get('/all-my-coupons', isAuthenticated, new SelectMyCouponsController().handle);
router.get('/my-coupons', isAuthenticated, new SelectValidCouponsController().handle);

export { router };