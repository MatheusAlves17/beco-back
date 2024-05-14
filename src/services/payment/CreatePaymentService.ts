import prismaClient from '../../prisma';


export interface CreatePayment {
    cards: Payment[];
    coupon?: Payment;
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


        if (coupon) {
            const couponIsValid = await prismaClient.prismaClient.coupon.findFirst({
                where: {
                    id: coupon.id
                },
                select: {
                    isUsed: true,
                    value: true
                }
            })

            if (!couponIsValid.isUsed) {
                const valueWithDiscount = valueTotalOrder.value_total.toNumber() - couponIsValid.value.toNumber();

                let totalCards = 0;
                for (const card of cards) {
                    totalCards += card.value
                }

                const totalOrder = totalCards + couponIsValid.value.toNumber();

                if (totalCards !== valueWithDiscount) {
                    return { msg: `Faltam R$ ${valueTotalOrder.value_total.toNumber() - totalOrder}` }
                }

                if (totalOrder !== valueTotalOrder.value_total.toNumber()) {
                    return { msg: `Faltam R$ ${valueTotalOrder.value_total.toNumber() - totalOrder}` }
                }

                const paymentCoupon = await prismaClient.prismaClient.paymentCoupon.create({
                    data: {
                        coupon_id: coupon.id,
                        value: couponIsValid.value,
                        order_id: order_id,

                    }
                });

                if (paymentCoupon) {
                    const updateCoupon = await prismaClient.prismaClient.coupon.update({
                        where: {
                            id: coupon.id
                        },
                        data: {
                            isUsed: true
                        }
                    });
                }

                const paymentData = cards.map(card => ({
                    id: card.id,
                    value: card.value,
                    order_id: order_id

                }));

                const paymentsCards = await prismaClient.prismaClient.paymentCard.createMany({
                    data: paymentData,
                });

                const status = await prismaClient.prismaClient.status.findFirst({
                    where: {
                        name: 'Em preparação'
                    },
                    select: {
                        id: true
                    }
                });

                if (status) {
                    const statusId = status.id;

                    const updateOrder = await prismaClient.prismaClient.order.update({
                        where: {
                            id: order_id
                        },
                        data: {
                            status: { connect: { id: statusId } }
                        },
                        select: {
                            item: true
                        }
                    });

                    console.log(updateOrder);


                    for (let item of updateOrder.item) {
                        const updateItems = await prismaClient.prismaClient.item.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                status_id: status.id
                            }
                        });


                        if (paymentCoupon && paymentsCards) {
                            return { msg: 'Pagamento realizado com sucesso!' };
                        }
                    }


                }
                else {
                    throw new Error('Cupom inválido')
                }
            } else {

                const isValueValid = (value: number) => {
                    return value > 10;
                };

                const isValid = cards.every(card => isValueValid(card.value));

                if (!isValid) {
                    throw new Error('O valor mínimo precisa ser de R$ 10.00')
                } else {
                    const paymentData = cards.map(card => ({
                        card_id: card.id,
                        value: card.value,
                        order_id: order_id

                    }));

                    const paymentsCards = await prismaClient.prismaClient.paymentCard.createMany({
                        data: paymentData,
                    });

                    const status = await prismaClient.prismaClient.status.findFirst({
                        where: {
                            name: 'Em preparação'
                        },
                        select: {
                            id: true
                        }
                    });

                    if (status) {
                        const statusId = status.id;

                        const updateOrder = await prismaClient.prismaClient.order.update({
                            where: {
                                id: order_id
                            },
                            data: {
                                status_id: statusId,
                            },
                            select: {
                                item: true
                            }
                        });

                        console.log(updateOrder);


                        for (let item of updateOrder.item) {
                            const updateItems = await prismaClient.prismaClient.item.update({
                                where: {
                                    id: item.id
                                },
                                data: {
                                    status_id: status.id
                                }
                            });

                            return { msg: 'Pagamento realizado com sucesso!' };
                        }



                    }
                }
            };




        };
    };
}

export { CreatePaymentService };