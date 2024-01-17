import { Request, Response } from "express";
import { DeleteProductService } from "../../services";

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const product_id = req.query.product_id as string;

        const deleteProductService = new DeleteProductService();
        const product = await deleteProductService.execute(product_id, user_id);

        return res.json(product);


    }
};

export { DeleteProductController };