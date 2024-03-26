import { Request, Response } from "express";
import { UploadAddressService } from "../../services";

class UploadAddressController {
    async handle(req: Request, res: Response) {
        const { id, street, number, zipCode, district, city, state, type } = req.body;

        const uploadAddressService = new UploadAddressService();
        const address = await uploadAddressService.execute({
            id,
            street,
            number,
            zipCode,
            district,
            city,
            state,
            type
        });

        return res.json(address);
    };
};

export { UploadAddressController };