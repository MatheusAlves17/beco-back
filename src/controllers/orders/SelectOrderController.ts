import { Request, Response } from "express";
import { SelectOrderService } from "../../services";

class SelectOrderController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;

        const selectOrderService = new SelectOrderService();
        const order = await selectOrderService.execute(order_id);

        return res.json(order);
    }
};

export { SelectOrderController };