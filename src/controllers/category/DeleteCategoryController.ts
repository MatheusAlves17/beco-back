import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services";

class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const category_id = req.query.category_id as string;

        const deleteCategoryService = new DeleteCategoryService();
        const category = await deleteCategoryService.execute(category_id, user_id);

        return res.json(category);
    }

};

export { DeleteCategoryController };