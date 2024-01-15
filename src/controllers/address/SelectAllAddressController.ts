import { Request, Response } from "express";
import { SelectAllAddressService } from "../../services";

class SelectAllAddressController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectAllAddressService = new SelectAllAddressService();
        const address = await selectAllAddressService.execute(user_id);

        return res.json(address);
    }

};

export { SelectAllAddressController };