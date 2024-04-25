import { Request, Response } from "express";

import { CreateProductService } from "../../services";

class CreateProductController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name, price, description, category_id, stock, weight, filename } = req.body;


        // if (!req.file) {
        //     throw new Error("Falha ao enviar foto do produto")
        // } else {
            // const { filename } = req.file;
            const createProductService = new CreateProductService();
            const product = await createProductService.execute(
                user_id,
                {
                    name,
                    price,
                    description,
                    banner: filename,
                    category_id,
                    stock: parseInt(stock),
                    weight: parseInt(weight)
                }
            );

            return res.json(product);
        // }
    }
};

export { CreateProductController };