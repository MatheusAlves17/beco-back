import { Request, Response } from "express";
import { ItemsToExchangeService } from "../../services";

class ItemsToExchangeController {
    async handle(req: Request, res: Response) {
        const { items, order_id } = req.body;
        
        const itemsToExchangeService = new ItemsToExchangeService();
        const itemsToReturn = await itemsToExchangeService.execute(items, order_id);

        return res.json(itemsToReturn);
    };
};

export { ItemsToExchangeController };