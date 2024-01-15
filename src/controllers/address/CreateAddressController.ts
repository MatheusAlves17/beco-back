import { Request, Response } from "express";

import { CreateAddressService } from "../../services";

class CreateAddressController {

    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { street, number, district, city, state, zipCode } = req.body;

        const createAddressService = new CreateAddressService();
        const address = await createAddressService.execute({
            street,
            number,
            district,
            city,
            state,
            zipCode,
            user_id
        });

        return res.json(address);
    };

};

export { CreateAddressController };