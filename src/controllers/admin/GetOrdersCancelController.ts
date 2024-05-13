import { Request, Response } from "express";
import { GetOrdersCancelService } from "../../services";

class GetOrdersCancelController {
    async handle(req: Request, res: Response) {
        const { status_id } = req.body;

        const getOrdersCancelService = new GetOrdersCancelService();
        const orders = await getOrdersCancelService.execute(status_id);

        return res.json(orders);
    };
};

export { GetOrdersCancelController };