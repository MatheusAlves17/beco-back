import { Request, Response } from "express";
import { GetAllOrdersService } from "../../services";

class GetAllOrdersController {
    async handle(req: Request, res: Response) {
        const { status_id} = req.body;
        const getAllOrdersService = new GetAllOrdersService();

        const orders = await getAllOrdersService.execute(status_id);
        return res.json(orders)
    }
};

export { GetAllOrdersController };