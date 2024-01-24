import prismaClient from '../../prisma';
interface IUpdateItem {
  item_id: string;
};
class UpdateItemService {
  async execute(status_id: string, items: string[]) {

    const updatedItems = await prismaClient.prismaClient.item.updateMany({
      where: {
        id: {
          in: items
        },
      },
      data: {
        status_id,
      },
    });

    return updatedItems;
  }

};

export { UpdateItemService };