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
    InactiveProductController,

    CreateStatusController,
    UpdateStatusController,
    DeleteStatusController,
    SelectStatusController,
    SelectAllStatusController,

    CreateOrderController,
    UpdateOrderController,
    SelectAllOrdersController,
    SelectOrderController,
    CancelOrderController,

    GetItemController,
    CreateItemController,
    ItemsToExchangeController,
    
    CreateCouponController,
    UpdateCouponController,
    SelectMyCouponsController,
    SelectValidCouponsController,
    CreatePaymentController,
    
    GetAllOrdersController,
    UpdateOrderStatusController,
    AuthorizeExchangeController,
    GetItemsExchangeController,
    ReceiptItemsController,
    GetOrdersCancelController
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

router.post('/category', new CreateCategoryController().handle);
router.get('/category/one', new SelectCategoryController().handle);
router.put('/category/update', new UpdateCategoryController().handle);
router.get('/category/all', new SelectAllCategoriesController().handle);
router.delete('/category/delete', new DeleteCategoryController().handle);

router.get('/product/one', new SelectProductController().handle);
router.get('/product/all', new SelectProductsController().handle);
router.delete('/product', new DeleteProductController().handle);
router.post('/product',  upload.single('file'), new CreateProductController().handle);
// router.post('/product', new CreateProductController().handle);
router.put('/product', upload.single('file'), new UpdateProductController().handle);
router.put('/product/inactive', new InactiveProductController().handle);

router.put('/status', new UpdateStatusController().handle);
router.post('/status', new CreateStatusController().handle);
router.delete('/status', new DeleteStatusController().handle);
router.get('/status/one', new SelectStatusController().handle);
router.get('/status/all', new SelectAllStatusController().handle);

router.put('/order', isAuthenticated, new UpdateOrderController().handle);
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.get('/order/one', isAuthenticated, new SelectOrderController().handle);
router.get('/order/all', isAuthenticated, new SelectAllOrdersController().handle);
router.post('/order/cancel',isAuthenticated, new CancelOrderController().handle)

router.get('/items', isAuthenticated, new GetItemController().handle);
router.post('/item', isAuthenticated,  new CreateItemController().handle);
router.put('/item', isAuthenticated, new UpdateItemController().handle);
router.put('/item-exchange', isAuthenticated, new ItemsToExchangeController().handle);



router.post('/coupon', new CreateCouponController().handle);
router.put('/coupon', isAuthenticated, new UpdateCouponController().handle);
router.get('/all-my-coupons', isAuthenticated, new SelectMyCouponsController().handle);
router.get('/my-coupons', isAuthenticated, new SelectValidCouponsController().handle);

router.post('/payment', isAuthenticated, new CreatePaymentController().handle);

router.get('/admin/orders', new GetAllOrdersController().handle);
router.post('/admin/orders/status', new UpdateOrderStatusController().handle);
router.get('/admin/items-exchange', new GetItemsExchangeController().handle);
router.put('/admin/items-exchange', new AuthorizeExchangeController().handle);
router.post('/admin/items-receipt', new ReceiptItemsController().handle);
router.get('/admin/orders-cancel', new GetOrdersCancelController().handle);




export { router };