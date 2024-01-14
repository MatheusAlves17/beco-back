import { Request, Response } from "express";
import { DeleteCardService } from "../../services";

class DeleteCardController {
    async handle(req: Request, res: Response) {
        const card_id  = req.query.card_id as string;
        const user_id = req.user_id;

        console.log(card_id);
        console.log(user_id);
        
        const deleteCardService = new DeleteCardService();

        const card = await deleteCardService.execute({card_id, user_id});
        return res.json(card);

    }
};

export { DeleteCardController };