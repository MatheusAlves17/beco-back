import { Request, Response } from "express";
import { ReceiptItemsService } from "../../services";

class ReceiptItemsController {
    async handle(req: Request, res: Response) {
        const { items, order_id } = req.body;

        const receiptItemsService = new ReceiptItemsService();
        const itemsReceipt = await receiptItemsService.execute(items, order_id);

        return res.json(itemsReceipt)
    };
};

export { ReceiptItemsController };