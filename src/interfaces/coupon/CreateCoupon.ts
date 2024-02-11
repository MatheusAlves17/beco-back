export interface CreateCoupon {
    value: number;
    user_id: string;
    client_id: string;
    isUsed?: boolean;
};