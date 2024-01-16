import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services";

class UpdateCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name, category_id } = req.body;

        const updateCategoryService = new UpdateCategoryService();
        const category = await updateCategoryService.execute({ user_id, name, category_id });
        return res.json(category);
    };
};

export { UpdateCategoryController };