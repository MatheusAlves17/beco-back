import { Request, Response } from "express";
import { UpdateOrderService } from "../../services";

class UpdateOrderController {
    async handle(req: Request, res: Response) {
        const { order_id, status_id } = req.body;

        const updateOrderService = new UpdateOrderService();
        const order = await updateOrderService.execute({
            status_id,
            order_id
        });

        return res.json(order);
    };
};

export { UpdateOrderController };