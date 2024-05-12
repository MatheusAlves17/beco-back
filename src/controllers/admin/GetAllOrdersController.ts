import { Request, Response } from "express";
import { GetAllOrdersService } from "../../services";

class GetAllOrdersController {
    async handle(req: Request, res: Response) {
        const getAllOrdersService = new GetAllOrdersService();

        const orders = await getAllOrdersService.execute();
        return res.json(orders)
    }
};

export { GetAllOrdersController };