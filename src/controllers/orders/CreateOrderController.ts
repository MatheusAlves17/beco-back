import { Request, Response } from "express";
import { CreateOrderService } from "../../services";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { delivery, value_total, status_id, address_id } = req.body;

        const createOrderService = new CreateOrderService();
        const order = await createOrderService.execute({
            delivery,
            value_total,
            status_id,
            user_id,
            address_id
        });

        return res.json(order);
    }; 
};

export { CreateOrderController };
