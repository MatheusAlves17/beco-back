import { Request, Response } from "express";
import { SelectProductService } from "../../services";

class SelectProductController {
    async handle(req: Request, res: Response) {

        const product_id = req.query.product_id as string;

        const selectProductService = new SelectProductService();
        const product = await selectProductService.execute(product_id);

        return res.json(product);
    };
};

export { SelectProductController };