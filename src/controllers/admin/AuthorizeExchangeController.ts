import { Request, Response } from "express"
import { AuthorizeExchangeService } from "../../services"
class AuthorizeExchangeController {
    async handle(req: Request, res: Response) {

        const { items, status_id } = req.body;

        const authorizeExchangeService = new AuthorizeExchangeService();

        const itemsToExchange = await authorizeExchangeService.execute(items, status_id);

        return res.json(itemsToExchange);
    };
};

export { AuthorizeExchangeController }