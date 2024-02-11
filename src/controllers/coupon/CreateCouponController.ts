import { Request, Response } from "express";
import { CreateCouponService } from "../../services";

class CreateCouponController {
    async handle(req: Request, res: Response) {
        
        const user_id  = req.user_id;

        const { client_id, value } = req.body;


        const createCouponService = new CreateCouponService();
        
        const coupon = await createCouponService.execute({
            user_id,
            client_id,
            value,
        });

        return res.json(coupon);
    }
};

export { CreateCouponController };