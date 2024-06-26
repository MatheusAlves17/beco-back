import prismaClient from '../../prisma';

interface IPurchase {

    user_id: string;
    address_id: string;
    delivery: number;
    value_total: number;
    items: IItems[];
    cards?: IPayment[];
    coupons?: IPayment[];

};

interface IItems {
    name: string;
    price: number;
    banner: string;
    product_id: string;
    quantity?: number;

    // order_id: string;
    // status_id: string;
    // user_id: string;
};

export interface IPayment {
    id: string;
    value: number;
}

class CreatePurchaseService {
    async execute({ user_id, address_id, value_total, delivery, items, cards, coupons }: IPurchase) {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Em preparação'
            }
        });

        const valueCoupons = !!coupons ? coupons.reduce((accumulator, current) => { return accumulator + current.value }, 0) : 0;

        const valueWithDiscount = value_total - valueCoupons;

        if (!coupons) {
            const isValueValid = (value: number) => {
                return value > 10;
            };

            const isValid = cards.every(item => isValueValid(item.value));

            if (!isValid) {
                throw new Error('Valor mínimo para cartões é de R$ 10,00');
            };
        };

        const valueCards = !!cards ? cards.reduce((accumulator, current) => { return accumulator + current.value }, 0) : 0;

        if (valueWithDiscount < valueCards) {
            throw new Error('Valor inválido');
        }

        const order = await prismaClient.prismaClient.order.create({
            data: {
                delivery: delivery,
                value_total: valueWithDiscount,
                user_id: user_id,
                status_id: status.id,
                address_id: address_id,
            }
        });

        if (order) {
            for (let item of items) {
                const products = await prismaClient.prismaClient.product.findFirst({
                    where: {
                        id: item.product_id
                    }, select: {
                        stock: true
                    }
                });

                if (products.stock.toNumber() !== 0) {
                    for (let i = 0; i <= item.quantity; i++) {
                        const createItem = await prismaClient.prismaClient.item.create({
                            data: {
                                name: item.name,
                                price: item.price,
                                banner: item.banner,
                                order_id: order.id,
                                product_id: item.product_id,
                                status_id: status.id,
                                user_id,
                            }
                        });

                        if (createItem) {
                            const updateStock = await prismaClient.prismaClient.product.update({
                                where: {
                                    id: item.product_id
                                },
                                data: {
                                    stock: {
                                        decrement: 1
                                    },
                                }
                            });


                        }

                    };

                } else {
                    throw new Error('Produto indisponível');
                };
            };

            if (cards) {

                for (let card of cards) {
                    const cardsPayment = await prismaClient.prismaClient.paymentCard.create({
                        data: {
                            card_id: card.id,
                            value: card.value,
                            order_id: order.id
                        }
                    });
                };
            };

            if (coupons) {
                for (let coupon of coupons) {
                    const coupons = await prismaClient.prismaClient.paymentCoupon.create({
                        data: {
                            coupon_id: coupon.id,
                            value: coupon.value
                        }
                    });

                    if (coupons) {
                        const updateCoupons = await prismaClient.prismaClient.coupon.update({
                            where: {
                                id: coupon.id
                            },
                            data: {
                                isUsed: true
                            }
                        });
                    };
                };
            };

            return { message: 'Compra finalizada' };
        };


        return { ok: valueWithDiscount === valueCards ? true : false }



    }
};

export { CreatePurchaseService };