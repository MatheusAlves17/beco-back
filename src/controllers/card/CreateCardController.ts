import { Request, Response } from "express";

import { ICard } from "../../interfaces";
import { CreateCardService } from "../../services";

class CreateCardController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { number, validity, name, cvv } = req.body as ICard;
        const createCardService = new CreateCardService();

        const card = await createCardService.execute(user_id, { number, validity, name, cvv });

        return res.json(card)
    }
};

export { CreateCardController };