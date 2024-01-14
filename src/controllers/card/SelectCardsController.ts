import { Request, Response } from "express";

import { SelectCardsService } from "../../services";

class SelectCardsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const selectCardsService = new SelectCardsService();

        const cards = await selectCardsService.execute({ user_id });
        return res.json(cards);
    };
};

export { SelectCardsController };