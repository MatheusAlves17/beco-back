import prismaClient from '../../prisma';

class RankingProductsService {
    async execute(startDate: string, endDate: string) {

        const products = await prismaClient.prismaClient.order.findMany();

        const getDateOnly = (datetime) => {
            const date = new Date(datetime);
            return date.toISOString().split('T')[0];
        };


        const salesCount = {};

        products.forEach(item => {
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

        const result = Object.keys(salesCount).map(date => ({
            created_at: date,
            sales: salesCount[date]
        }));

        return result;


    };
};

export { RankingProductsService };