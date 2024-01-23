import { Request, Response } from "express";
import { UpdateOrderService } from "../../services";

class UpdateOrderController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { order_id, status_id } = req.body;

        const updateOrderService = new UpdateOrderService();
        const order = await updateOrderService.execute({
            user_id,
            status_id,
            order_id
        });

        return res.json(order);
    };
};

export { UpdateOrderController };