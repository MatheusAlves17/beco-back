import prismaClient from '../../prisma';
type ProductSales = {
    name: string;
    product_id: string;
    totalSales: number;
    created_at: Date;
};
class RankingProductsService {
    async execute(startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const orders = await prismaClient.prismaClient.order.findMany();
        const products = await prismaClient.prismaClient.item.findMany();

        // ORDERS
        const getDateOnly = (datetime) => {
            const date = new Date(datetime);
            return date.toISOString().split('T')[0];
        };

        const salesCount = {};

        orders.forEach(item => {
            const date = getDateOnly(item.created_at);
            if (date >= startDate && date <= endDate) {
                const dateString = date.toString().split('T')[0];
                if (salesCount[dateString]) {
                    salesCount[dateString]++;
                } else {
                    salesCount[dateString] = 1;
                }
            }
        });

        const ordersResult = Object.keys(salesCount).map(date => ({
            created_at: date,
            sales: salesCount[date]
        }));

        //PRODUCTS
        const productsCount: Map<string, { name: string; count: number }> = new Map();
        products.forEach(product => {
            if (productsCount.has(product.product_id)) {
                productsCount.get(product.product_id)!.count++;
            } else {
                productsCount.set(product.product_id, { name: product.name, count: 1 });
            }
        });

        const productsResult: ProductSales[] = [];

        const filteredProducts = products.filter(product => {
            const createdAt = new Date(product.created_at);
            return createdAt >= start && createdAt <= end;
        });


        filteredProducts.forEach(product => {
            if (!productsResult[product.product_id]) {
                productsResult[product.product_id] = {
                    name: product.name,
                    product_id: product.product_id,
                    totalSales: 0,
                    created_at: product.created_at
                };
            }
            productsResult[product.product_id].totalSales += 1;
        });

        return {orders: ordersResult, products: Object.values(productsResult)};

    };
};

export { RankingProductsService };