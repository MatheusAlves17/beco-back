import { Request, Response } from "express";
import { UpdateCouponService } from "../../services";

class UpdateCouponController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { id } = req.body;

        const updateCouponService = new UpdateCouponService();
        const coupon = await updateCouponService.execute({
            user_id,
            id
        });

        return res.json(coupon);

    };
};

export { UpdateCouponController };