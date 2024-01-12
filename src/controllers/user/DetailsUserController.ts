import { Request, Response } from "express";
import { DetailsUserService } from "../../services";

class DetailsUserController {
    async handle(req: Request, res: Response) {
        const  user_id  = req.user_id as string;

        const detailsUserService = new DetailsUserService();

        const details = await detailsUserService.execute(user_id);

        return res.json(details);
    }
    ;
};

export { DetailsUserController };