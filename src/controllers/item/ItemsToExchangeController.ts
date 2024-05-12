import { Request, Response } from "express";
import { ItemsToExchangeService } from "../../services";

class ItemsToExchangeController {
    async handle(req: Request, res: Response) {
        const { items } = req.body;
        
        const itemsToExchangeService = new ItemsToExchangeService();
        const itemsToReturn = await itemsToExchangeService.execute(items);

        return res.json(itemsToReturn);
    };
};

export { ItemsToExchangeController };