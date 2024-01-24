import prismaClient from '../../prisma';
interface IUpdateItem {
  item_id: string;
  status_id: string;
};
class UpdateItemService {
  async execute(items: IUpdateItem[]) {
    let itemsToReturn = [];

    for (let i = 0; i < items.length; i++) {
      const updatedItem = await prismaClient.prismaClient.item.updateMany({
        where: {
          id: items[i].item_id,
        },
        data: {
          status_id: items[i].status_id,
        },
      });

      itemsToReturn.push(updatedItem);
    }

    return itemsToReturn;
  }
};

export { UpdateItemService };