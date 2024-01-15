import { Request, Response } from "express";
import { DeleteAddressService } from "../../services";

class DeleteAddressController {
    async handle(req: Request, res: Response) {
        const address_id = req.query.address_id as string;

        const deleteAddressService = new DeleteAddressService();
        const address = await deleteAddressService.execute(address_id);

        return res.json(address);
    }
};

export { DeleteAddressController };