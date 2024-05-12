import { Request, Response } from "express";
import { CreateItemService } from "../../services";

class CreateItemController {
    async handle(req: Request, res: Response) {
        const {
            name,
            price,
            file,
            order_id,
            product_id,
            status_id,
            user_id
        } = req.body;

        // if (!req.file) {
        //     throw new Error("Falha ao enviar foto do produto")

        // } else {
            // const { filename } = req.file
            const createItemService = new CreateItemService();
            const item = await createItemService.execute({
                name,
                price,
                banner: file,
                order_id,
                product_id,
                status_id,
                user_id
            });

            return res.json(item);
        // }
    }
};

export { CreateItemController };