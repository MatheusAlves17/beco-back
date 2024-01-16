import { Request, Response } from "express";
import { CreateCategoryService } from "../../services";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name } = req.body;
        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({ name, user_id });
        return res.json(category);
    };

};

export { CreateCategoryController };