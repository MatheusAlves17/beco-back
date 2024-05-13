import { Request, Response } from "express";
import { SendItemsService } from "../../services";
class SendItemsController {
    async handle(req: Request, res: Response) {
        const { order_id, items } = req.body;

        const sendItemsService = new SendItemsService();
        const itemsToRecept = await sendItemsService.execute(order_id, items);

        return res.json(itemsToRecept);
    }
};

export { SendItemsController };