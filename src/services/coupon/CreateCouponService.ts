import prismaClient from '../../prisma';

class CreateCouponService {
    async execute() {

        const status = await prismaClient.prismaClient.status.findFirst({
            where: {
                name: 'Devolvido'
            }
        });



        const items = await prismaClient.prismaClient.item.findMany({
            where: {
                status_id: status.id
            }
        });

        const itemsId = items.map(item => item.product_id);

        const products = await prismaClient.prismaClient.product.findMany({
            where:{
                id: {
                    in: itemsId
                }
            }
        });

        const prices = products.map(product => product.price);
        const valueCoupon = parseInt(prices.reduce((acc: any, num: any) => acc + num, 0));


        // console.log(products);
        // console.log(valueCoupon);

        return items;

    };
};

export { CreateCouponService };