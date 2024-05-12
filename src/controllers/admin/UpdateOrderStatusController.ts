import { Request, Response } from "express";
import { UpdateOrderStatusService } from "../../services";

class UpdateOrderStatusController {
    async handle(req: Request, res: Response) {
        const { order_id, status_id } = req.body;

        const updateOrderStatusService = new UpdateOrderStatusService();
        const orderUpdated = await updateOrderStatusService.execute({ order_id, status_id });

        return res.json(orderUpdated);

    }
};

export { UpdateOrderStatusController };