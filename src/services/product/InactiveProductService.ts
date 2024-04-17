import prismaClient from '../../prisma';
class InactiveProductService {

    async execute(product_id: string, isActive: boolean, isAdmin: string) {

        if (isAdmin !== 'admin@master.com') {
            throw new Error('Operação não autorizada');
        };

        const product = await prismaClient.prismaClient.product.update({
            where: {
                id: product_id
            },
            data: {
                active: isActive
            },
        });

        return product;

    }

};

export { InactiveProductService };