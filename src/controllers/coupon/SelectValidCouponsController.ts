import { Request, Response } from "express";
import { SelectValidCouponsService } from "../../services";

class SelectValidCouponsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectValidCouponsService = new SelectValidCouponsService();
        const coupons = await selectValidCouponsService.execute(user_id);

        return res.json(coupons);
    };
};

export { SelectValidCouponsController };