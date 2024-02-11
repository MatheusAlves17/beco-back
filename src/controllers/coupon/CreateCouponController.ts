import { Request, Response } from "express";
import { CreateCouponService } from "../../services";

class CreateCouponController {
    async handle(req: Request, res: Response) {
        const createCouponService = new CreateCouponService();
        const coupon = await createCouponService.execute();

        return res.json(coupon);
    }
};

export { CreateCouponController };