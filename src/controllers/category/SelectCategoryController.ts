import { Request, Response } from "express";
import { SelectCategoryService } from "../../services";

class SelectCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const selectCategoryService = new SelectCategoryService();

        const categories = await selectCategoryService.execute(user_id);

        return res.json(categories);

    }
};

export { SelectCategoryController };