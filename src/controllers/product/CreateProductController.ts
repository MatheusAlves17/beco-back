import { Request, Response } from "express";

import { CreateProductService } from "../../services";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name, price, description, banner, category_id, stock } = req.body;
        const { filename } = req.file;

        const createProductService = new CreateProductService();
        const product = await createProductService.execute(
            user_id,
            {
                name,
                price,
                description,
                banner: filename,
                category_id,
                stock
            }
        );

        return res.json(product);

    }
};

export { CreateProductController };