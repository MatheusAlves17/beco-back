import prismaClient from '../../prisma';

class ItemsToExchangeService {
  async execute(items: string[], order_id: string) {
    const status = await prismaClient.prismaClient.status.findFirst({
      where: {
        name: 'Em troca'
      },
      select: {
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

    if (updatedItems) {
      const updateOrder = await prismaClient.prismaClient.order.update({
        where: {
          id: order_id
        },
        data:{
          status_id: status.id
        }
      })
    }

    return updatedItems;
  }

};

export { ItemsToExchangeService };