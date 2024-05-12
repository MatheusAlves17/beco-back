import { Request, Response } from "express";
import { CreateExchangesService } from "../../services";

class CreateExchangesController {
    async handle(req: Request, res: Response) {

        const { itemsId } = req.body;
        const createExchangesService = new CreateExchangesService();

        const itemsToExchange = await createExchangesService.execute(itemsId);

        return res.json(itemsToExchange);
    }
};

export { CreateExchangesController };