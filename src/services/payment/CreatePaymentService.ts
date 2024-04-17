
interface CreatePayment {
    value: number;
    order_id: string;
    card_id?: string;
    coupon?: string;
}

class CreatePaymentService{
    async execute(){
    }
};

export {CreatePaymentService};