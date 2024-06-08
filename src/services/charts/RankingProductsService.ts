import prismaClient from '../../prisma';

interface ProductCount {
    name: string;
    product_id: string;
    count: number;
  }
  


class RankingProductsService {
    async execute() {
        const products = await prismaClient.prismaClient.item.findMany();

        const productCountMap = new Map<string, ProductCount>();

        products.forEach((product) => {
          if (productCountMap.has(product.product_id)) {
            const existingProduct = productCountMap.get(product.product_id)!;
            existingProduct.count += 1;
          } else {
            productCountMap.set(product.product_id, {
              name: product.name,
              product_id: product.product_id,
              count: 1,
            });
          }
        });

        const productCountArray = Array.from(productCountMap.values());

        
        productCountArray.sort((a, b) => b.count - a.count);


        return productCountArray;
    };
};

export { RankingProductsService };