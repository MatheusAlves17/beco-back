import prismaClient from '../../prisma';

class DeleteProductService {
    async execute(product_id: string, user_id: string) {

        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        });

        if(isAdmin.role !== "admin"){
            throw new Error('Operação inválida');
        }

        const productExists = await prismaClient.prismaClient.product.findFirst({
            where: {
                id: product_id
            }
        });

        if (!productExists) {
            throw new Error('Produto inválido');
        };

        const productDelete = await prismaClient.prismaClient.product.delete({
            where: {
                id: product_id
            }
        });

        return 'Produto excluído com sucesso';
    }
};

export { DeleteProductService };