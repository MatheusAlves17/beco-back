import { Request, Response } from "express";
import { RankingProductsService } from "../../services";

interface Params {
    startDate: string;
    endDate: string;
}
class RankingProductsController {
    async handle(req: Request, res: Response) {

        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;

        const rankingProductsService = new RankingProductsService();

        const products = await rankingProductsService.execute(startDate, endDate);

        return res.json(products);
    };
};

export { RankingProductsController };