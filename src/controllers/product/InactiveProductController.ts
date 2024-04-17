import { Request, Response } from "express";
import { InactiveProductService } from "../../services";

class InactiveProductController {
    async handle(req: Request, res: Response) {
        const { product_id, isActive } = req.body;
        const isAdmin = req.query.isAdmin as string;


        const inactiveProductService = new InactiveProductService();
        const product = await inactiveProductService.execute(product_id, isActive, isAdmin);

        return res.json(product);

    }
};

export { InactiveProductController };