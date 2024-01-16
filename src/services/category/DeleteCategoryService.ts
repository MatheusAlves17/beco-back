import prismaClient from '../../prisma';

class DeleteCategoryService {
    async execute(category_id: string, user_id: string) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        });

        if(isAdmin.role !== 'admin'){
            throw new Error('Operação inválida!');
        };

        const categoryExists = await prismaClient.prismaClient.category.findFirst({
            where: {
                id: category_id
            }
        });

        if (!categoryExists) {
            throw new Error('Categoria não encontrada');
        }

        const categoryDelete = await prismaClient.prismaClient.category.delete({
            where: {
                id: category_id
            }
        });

        return "Categoria excluída com sucesso!";
    };
};

export { DeleteCategoryService };