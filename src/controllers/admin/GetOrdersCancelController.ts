import { Request, Response } from "express";
import { GetOrdersCancelService } from "../../services";

class GetOrdersCancelController {
    async handle(req: Request, res: Response) {

        const getOrdersCancelService = new GetOrdersCancelService();
        const orders = await getOrdersCancelService.execute();

        return res.json(orders);
    };
};

export { GetOrdersCancelController };