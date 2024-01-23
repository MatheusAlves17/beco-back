import { Prisma } from '@prisma/client';
import prismaClient from '../../prisma';

interface IUpdateItem {
    order_id?: string;
    item_id: string;
    status_id: string;
};

class UpdateItemService {
    async execute(items: IUpdateItem[]) {
        const updates: Prisma.ItemUpdateManyArgs[] = items.map(item => ({
            where: {
                id: item.item_id,
            },
            data: {
                status_id: item.status_id,
            },
        }));

        const itemsToReturn = await prismaClient.prismaClient.item.updateMany({
            data: {
                // Combina todos os objetos de dados dos itens em um objeto
                ...updates.reduce((acc, update) => ({ ...acc, ...update.data }), {}),
            },
            where: {
                // Combina todos os objetos where dos itens em um objeto
                OR: updates.map(update => ({ ...update.where })),
            },
        });

        return itemsToReturn;
    }
};

export { UpdateItemService };