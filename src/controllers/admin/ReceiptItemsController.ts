import { Request, Response } from "express";
import { ReceiptItemsService } from "../../services";

class ReceiptItemsController {
    async handle(req: Request, res: Response) {
        const { items } = req.body;

        const receiptItemsService = new ReceiptItemsService();
        const itemsReceipt = await receiptItemsService.execute(items);

        return res.json(itemsReceipt)
    };
};

export { ReceiptItemsController };