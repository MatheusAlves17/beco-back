import { Request, Response } from "express";
import { UpdateItemService } from "../../services/item/UpdateItemService";

class UpdateItemController {
    async handle(req: Request, res: Response) {
        const { items } = req.body;

        const updateItemService = new UpdateItemService();
        const itemsToReturn = updateItemService.execute(items);

        return res.json(itemsToReturn);
    };
};

export { UpdateItemController };