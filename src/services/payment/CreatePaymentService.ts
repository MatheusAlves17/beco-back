import prismaClient from '../../prisma';


export interface CreatePayment {
    cards: Payment[];
    coupon?: Payment[];
    order_id: string;
}
export interface Payment {
    id: string;
    value: number;
}

class CreatePaymentService {
    async execute({ cards, coupon, order_id }: CreatePayment) {

        // if (!order_id) {
        //     throw new Error('Ordem inválida')
        // }

        // const valueTotalOrder = await prismaClient.prismaClient.order.findFirst({
        //     where: {
        //         id: order_id
        //     },
        //     select: {
        //         value_total: true
        //     }
        // });


        // if (coupon) {
        //     // const couponIsValid = await prismaClient.prismaClient.coupon.findFirst({
        //     //     where: {
        //     //         id: coupon.id
        //     //     },
        //     //     select: {
        //     //         isUsed: true,
        //     //         value: true
        //     //     }
        //     // })

        //     // if (!couponIsValid.isUsed) {



        //     // const valueWithDiscount = valueTotalOrder.value_total.toNumber() - couponIsValid.value.toNumber();
        //     let totalCards = 0;
        //     let discount = 0;

        //     for (const item of coupon) {
        //         discount += item.value;
        //     }

        //     for (const card of cards) {
        //         totalCards += card.value
        //     }

        //     const totalOrder = totalCards - discount;

        //     if (totalCards !== (totalOrder - discount)) {
        //         return { msg: `Faltam R$ ${valueTotalOrder.value_total.toNumber() - totalOrder}` }
        //     }

        //     if (totalOrder !== (totalOrder - discount)) {
        //         return { msg: `Faltam R$ ${valueTotalOrder.value_total.toNumber() - totalOrder}` }
        //     }

        //     const couponData = coupon.map(card => ({
        //         id: card.id,
        //         value: card.value,
        //         order_id: order_id

        //     }));

        //     const paymentCoupon = await prismaClient.prismaClient.paymentCoupon.createMany({
        //         data: couponData

        //     });

        //     // if (paymentCoupon) {
        //     //     const couponIds = coupon.map(card => card.id);

        //     //     const updateCoupon = await prismaClient.prismaClient.coupon.updateMany({
        //     //         where: {
        //     //             id: {
        //     //                 in: couponIds
        //     //             }
        //     //         },
        //     //         data: {
        //     //             isUsed: true
        //     //         }
        //     //     });
        //     // }

        //     const paymentData = cards.map(card => ({
        //         id: card.id,
        //         value: card.value,
        //         order_id: order_id

        //     }));

        //     const paymentsCards = await prismaClient.prismaClient.paymentCard.createMany({
        //         data: paymentData,
        //     });

        //     const status = await prismaClient.prismaClient.status.findFirst({
        //         where: {
        //             name: 'Em preparação'
        //         },
        //         select: {
        //             id: true
        //         }
        //     });

        //     if (status) {
        //         const statusId = status.id;

        //         const updateOrder = await prismaClient.prismaClient.order.update({
        //             where: {
        //                 id: order_id
        //             },
        //             data: {
        //                 status: { connect: { id: statusId } }
        //             },
        //             select: {
        //                 item: true
        //             }
        //         });

        //         console.log(updateOrder);


        //         for (let item of updateOrder.item) {
        //             const updateItems = await prismaClient.prismaClient.item.update({
        //                 where: {
        //                     id: item.id
        //                 },
        //                 data: {
        //                     status_id: status.id
        //                 }
        //             });


        //             if (paymentCoupon && paymentsCards) {
        //                 return { msg: 'Pagamento realizado com sucesso!' };
        //             }
        //         }


        //         // }
        //         // else {
        //         //     throw new Error('Cupom inválido')
        //         // }
        //     } else {

        //         const isValueValid = (value: number) => {
        //             return value > 10;
        //         };

        //         const isValid = cards.every(card => isValueValid(card.value));

        //         if (!isValid) {
        //             throw new Error('O valor mínimo precisa ser de R$ 10.00')
        //         } else {
        //             const paymentData = cards.map(card => ({
        //                 card_id: card.id,
        //                 value: card.value,
        //                 order_id: order_id

        //             }));

        //             const paymentsCards = await prismaClient.prismaClient.paymentCard.createMany({
        //                 data: paymentData,
        //             });

        //             const status = await prismaClient.prismaClient.status.findFirst({
        //                 where: {
        //                     name: 'Em preparação'
        //                 },
        //                 select: {
        //                     id: true
        //                 }
        //             });

        //             if (status) {
        //                 const statusId = status.id;

        //                 const updateOrder = await prismaClient.prismaClient.order.update({
        //                     where: {
        //                         id: order_id
        //                     },
        //                     data: {
        //                         status_id: status.id,
        //                     },
        //                     select: {
        //                         item: true
        //                     }
        //                 });

        //                 console.log(updateOrder);


        //                 for (let item of updateOrder.item) {
        //                     const updateItems = await prismaClient.prismaClient.item.update({
        //                         where: {
        //                             id: item.id
        //                         },
        //                         data: {
        //                             status_id: status.id
        //                         }
        //                     });

        //                     return { msg: 'Pagamento realizado com sucesso!' };
        //                 }



        //             }
        //         }
        //     };




        // };
        return { ok: true }
    };
}

export { CreatePaymentService };