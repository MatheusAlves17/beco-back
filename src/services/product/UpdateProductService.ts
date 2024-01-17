import prismaClient from '../../prisma';

export interface IUpdateProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: string;
    stock: number;
};

class UpdateProductService {
    async execute(user_id, { id, name, price, description, banner, category_id, stock }: IUpdateProduct) {

        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role !== 'admin') {
            throw new Error('Operação não autorizada');
        };

        const productExists = await prismaClient.prismaClient.product.findFirst({
            where: {
                id
            }
        });

        if (!productExists) {
            throw new Error('Produto não existe');
        };

        if (!name) {
            throw new Error('Nome obrigatório');
        };

        if (!price) {
            throw new Error('Preço obrigatório');
        };

        if (!description) {
            throw new Error('Descrição obrigatória');
        };

        if (!banner) {
            throw new Error('Foto obrigatória');
        };

        if (!category_id) {
            throw new Error('Categoria obrigatória');
        };

        if (!stock) {
            throw new Error('Quantidade obrigatória');
        };

        const product = await prismaClient.prismaClient.product.update({
            where: {
                id
            },
            data: {
                name,
                price,
                description,
                banner,
                category_id,
                stock
            },
            select: {
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
                stock: true
            }
        });
        return product;

    }
};

export { UpdateProductService };