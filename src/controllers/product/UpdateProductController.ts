import { Request, Response } from "express";
import { UpdateProductService } from "../../services";

class UpdateProductController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { id, name, price, description, banner, category_id, stock } = req.body;
        const {filename} = req.file;

        const updateProductService = new UpdateProductService();
        const product = updateProductService.execute(
            user_id,
            {
                id,
                name,
                price,
                description,
                banner: filename,
                category_id,
                stock: parseInt(stock)
            });
        return res.json(product);

    }
};

export { UpdateProductController };