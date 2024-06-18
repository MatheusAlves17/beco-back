import { Request, Response } from "express";

import { CreatePurchaseService } from "../../services";

class CreatePurchaseController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { value_total, address_id, delivery, items, cards, coupons, created_at} = req.body;

        const createPurchaseService = new CreatePurchaseService();

        const purchase = await createPurchaseService.execute({
            user_id,
            address_id,
            delivery,
            value_total,
            items,
            cards,
            coupons,
            created_at
        });

        return res.json(purchase);
    };
};

export { CreatePurchaseController };