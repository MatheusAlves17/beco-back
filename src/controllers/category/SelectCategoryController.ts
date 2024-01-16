import { Request, Response } from "express";
import { SelectCategoryService } from "../../services";

class SelectCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const category_id = req.query.category_id as string;

        const selectCategoryService = new SelectCategoryService();

        const category = await selectCategoryService.execute(user_id, category_id);

        return res.json(category);

    }
};

export { SelectCategoryController };