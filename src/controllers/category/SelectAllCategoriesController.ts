import { Request, Response } from "express";
import { SelectAllCategoriesService } from "../../services";

class SelectAllCategoriesController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const selectAllCategoriesService = new SelectAllCategoriesService();

        const categories = await selectAllCategoriesService.execute(user_id);

        return res.json(categories);

    }
};

export { SelectAllCategoriesController };