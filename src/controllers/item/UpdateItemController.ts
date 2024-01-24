import { Request, Response } from "express";
import { UpdateItemService } from "../../services/item/UpdateItemService";

class UpdateItemController {
    async handle(req: Request, res: Response) {
        const { status_id, items } = req.body;

        console.log(status_id, items);
        

        const updateItemService = new UpdateItemService();
        const itemsToReturn = await updateItemService.execute(status_id, items);

        return res.json(itemsToReturn);
    };
};

export { UpdateItemController };