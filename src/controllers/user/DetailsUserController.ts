import { Request, Response } from "express";
import { DetailsUserService } from "../../services";

class DetailsUserController {
    async handle(req: Request, res: Response) {
        const detailsUserService = new DetailsUserService();

        const details = await detailsUserService.execute();
        return res.json(details);
    }
    ;
};

export { DetailsUserController };