import { Request, Response } from "express";
import { CreateCouponService } from "../../services";

class CreateCouponController {
    async handle(req: Request, res: Response) {

        const { order_id } = req.body;

        const createCouponService = new CreateCouponService();
        
        const coupon = await createCouponService.execute(order_id);

        return res.json(coupon);
    }
};

export { CreateCouponController };