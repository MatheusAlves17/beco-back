import { Request, Response } from "express";

import { CreatePaymentService } from "../../services/payment/CreatePaymentService";

interface CreatePayment {
    value_total?: number;
    value_card?: number;
    value_coupon?: number;
    card_id?: string;
    coupon_id?: string;
    order_id: string;
}


class CreatePaymentController {
    async handle(req: Request, res: Response) {
        const order_id = req.query.order_id as string;
        const { cards, coupon } = req.body;

        const createPaymentService = new CreatePaymentService();

        const payments = await createPaymentService.execute({cards, coupon, order_id});
        
        return res.json(payments);


    };
};

export { CreatePaymentController };