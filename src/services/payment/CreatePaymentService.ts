import prismaClient from '../../prisma';


export interface CreatePayment {
    cards: Payment[];
    coupon: Payment;
    order_id: string;
}
export interface Payment {
    id: string;
    value: number;
}

class CreatePaymentService {
    async execute({ cards, coupon, order_id }: CreatePayment) {

        if (!order_id) {
            throw new Error('Ordem inválida')
        }

        const valueTotalOrder = await prismaClient.prismaClient.order.findFirst({
            where: {
                id: order_id
            },
            select: {
                value_total: true
            }
        });

        if (coupon.id) {
            const valueDiscount = valueTotalOrder.value_total.toNumber() - coupon.value;

            const totalCardsValue = cards.reduce((acc, card) => acc + card.value, 0);

            if (totalCardsValue < valueDiscount) {
                throw new Error('O valor total dos cartões não é suficiente para cobrir o valor restante.');
            }

            const paymentsData = cards.map(card => ({
                card_id: card.id,
                valueCard: card.value,
                valueCoupon: coupon.value,
                coupon_id: coupon.id,
                order_id: order_id
            }));
        
            const createdPayments = await prismaClient.prismaClient.payment.createMany({
                data: paymentsData
            });
        }


        return valueTotalOrder;
    }
};

export { CreatePaymentService };