import { Request, Response } from "express";
import { GetItemService } from "../../services";

class GetItemController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;

        const getItemService = new GetItemService();

        const items = await getItemService.execute(order_id);

        return res.json(items);

    };
};

export { GetItemController };