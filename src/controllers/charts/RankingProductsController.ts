import { Request, Response } from "express";
import { RankingProductsService } from "../../services";

class RankingProductsController {
    async handle(req: Request, res: Response) {
        const rankingProductsService = new RankingProductsService();

        const products = await rankingProductsService.execute();
      
        return res.json(products);
    };
};

export { RankingProductsController };