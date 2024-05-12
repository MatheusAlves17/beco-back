import prismaClient from '../../prisma';

class ItemsToExchangeService {
  async execute(items: string[]) {

    const status = await prismaClient.prismaClient.status.findFirst({
        where:{
            name: 'Em troca'
        },
        select:{
            id: true
        }
    });

    const status_id = status.id

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

export { ItemsToExchangeService };