import { Request, Response } from "express";
import { SelectCardService } from "../../services";

class SelectCardController {
    async handle(req: Request, res: Response) {
        const card_id = req.query.card_id as string;
        const selectCardService = new SelectCardService();

        const card = await selectCardService.execute(card_id);

        return res.json(card);
    }

};

export { SelectCardController };