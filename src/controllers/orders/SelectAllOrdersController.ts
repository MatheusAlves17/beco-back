import { Request, Response } from "express";
import { SelectAllOrdersService } from "../../services";

class SelectAllOrdersController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectAllOrdersService = new SelectAllOrdersService();
        const orders = await selectAllOrdersService.execute(user_id);

        return res.json(orders);
    };
};

export { SelectAllOrdersController };