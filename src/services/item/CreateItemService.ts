import prismaClient from '../../prisma';

interface ICreateItem {
    name: string;
    price: number;
    banner: string;

    order_id: string;
    product_id: string;
    status_id: string;
    user_id: string;
};

class CreateItemService {
    async execute({
        name,
        price,
        banner,
        order_id,
        product_id,
        status_id,
        user_id
    }: ICreateItem) {

        const product = await prismaClient.prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        });

        const hasStock = product.stock.toNumber();
        if (hasStock > 0) {
            const items = await prismaClient.prismaClient.item.create({
                data: {
                    name,
                    price,
                    banner,
                    order_id,
                    product_id,
                    status_id,
                    user_id,
                }, select: {
                    id: true,
                    name: true,
                    price: true,
                    banner: true,
                    order_id: true,
                    product_id: true,
                    status_id: true,
                    user_id: true,
                    order: true

                }
            });


            const updateProduct = await prismaClient.prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    stock: {
                        decrement: 1
                    }
                }
            })

            return [items, updateProduct];


        } else {
            throw new Error('Produto indiponível')
        }

    };
};

export { CreateItemService };