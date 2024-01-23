import { Request, Response } from "express";
import { CreateItemService } from "../../services";

class CreateItemController {
    async handle(req: Request, res: Response) {
        const { items } = req.body;
        

        const createItemService = new CreateItemService();
        const item = await createItemService.execute(items);

        return res.json(item);
    }
};

export { CreateItemController };