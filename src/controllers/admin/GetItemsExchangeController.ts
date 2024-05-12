import { Request, Response } from "express";
import { GetItemsExchangeService } from "../../services";

class GetItemsExchangeController {
    async handle(req: Request, res: Response) {

        const itemsExchangeService = new GetItemsExchangeService();

        const itemsToExchange = await itemsExchangeService.execute();

        return res.json(itemsToExchange);
    };
};

export { GetItemsExchangeController }