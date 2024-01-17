import { Request, Response } from "express";
import { SelectProductsService } from "../../services";

class SelectProductsController {
    async handle(req: Request, res: Response) {
        const selectProductsService = new SelectProductsService();
        const products = await selectProductsService.execute();

        return res.json(products);
    }
};

export { SelectProductsController };