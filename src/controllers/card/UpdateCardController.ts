import { Request, Response } from "express";

import { UpdateCardService } from "../../services";
import { IUpdateCard } from "../../interfaces";

class UpdateCardController {
    async handle(req: Request, res: Response) {
        // const card_id = req.query.card_id as string;
        const user_id = req.user_id;
        
        const { id, number, cvv, validity, name, flag, principal } = req.body;

        const updateCardService = new UpdateCardService();
        const card = updateCardService.execute(user_id,{
            id,
            number,
            cvv,
            validity,
            name,
            flag,
            principal
        });

        return res.json(card);
    };
};

export { UpdateCardController };