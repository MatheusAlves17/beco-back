
import { Request, Response } from "express";
import { CancelOrderService } from "../../services";

class CancelOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;

        const cancelOrderService = new CancelOrderService();
        const order = cancelOrderService.execute({ order_id });

        return res.json(order);
    }
};

export { CancelOrderController };