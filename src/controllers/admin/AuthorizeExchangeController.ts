import { Request, Response } from "express"
import { AuthorizeExchangeService } from "../../services"
class AuthorizeExchangeController {
    async handle(req: Request, res: Response) {

        const { items } = req.body;

        const authorizeExchangeService = new AuthorizeExchangeService();

        const itemsToExchange = await authorizeExchangeService.execute(items);

        return res.json(itemsToExchange);
    };
};

export { AuthorizeExchangeController }