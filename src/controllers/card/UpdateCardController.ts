import { Request, Response } from "express";

import { UpdateCardService } from "../../services";
import { IUpdateCard } from "../../interfaces";

class UpdateCardController {
    async handle(req: Request, res: Response) {
        // const card_id = req.query.card_id as string;
        
        const { id, number, cvv, validity, name } = req.body;

        const updateCardService = new UpdateCardService();
        const card = updateCardService.execute({
            id,
            number,
            cvv,
            validity,
            name
        });

        return res.json(card);
    };
};

export { UpdateCardController };