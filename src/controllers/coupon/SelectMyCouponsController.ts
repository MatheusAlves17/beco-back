import { Request, Response } from "express";
import { SelectMyCouponsService } from "../../services";

class SelectMyCouponsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectMyCouponsService = new SelectMyCouponsService();
        const coupons = await selectMyCouponsService.execute(user_id);

        return res.json(coupons);
    };
};

export { SelectMyCouponsController };