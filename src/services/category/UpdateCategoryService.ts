import prismaClient from "../../prisma";

interface IUpdateCategory {
    user_id: string;
    category_id: string;
    name: string;

};

class UpdateCategoryService {
    async execute({ user_id, category_id, name }: IUpdateCategory) {
        const isAdmin = await prismaClient.prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        });

        if (isAdmin.role === 'admin') {
            const category = await prismaClient.prismaClient.category.update({
                where: {
                    id: category_id
                },
                data: {
                    name
                },
                select:{
                    id: true,
                    name: true
                }
            });
            return category;
        } else {
            throw new Error('Operação não autorizada!');
        }
    };
};

export { UpdateCategoryService };